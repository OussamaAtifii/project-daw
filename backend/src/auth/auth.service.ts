import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterAuthDto) {
    const { password, name, email } = credentials;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('El correo electrónico ya está en uso');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const payload = {
        id: createdUser.id,
        email: createdUser.email,
      };

      const token = this.jwtService.sign(payload);

      const userData = {
        userId: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        token,
      };

      return userData;
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(credentials: LoginAuthDto) {
    const { email, password } = credentials;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isPasswordValid =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && isPasswordValid)) {
      throw new ForbiddenException('Email o contraseña invalidos');
    }

    const payload = {
      email: user.email,
      id: user.id,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      userId: user.id,
      name: user.name,
      email: user.email,
      token,
    };

    return data;
  }

  async validateToken(userInfo: any) {
    try {
      const { token, id } = userInfo;
      console.log(token, id);

      if (!id || !token) {
        throw new ForbiddenException('Token o usuario invalidos');
      }

      const payload = this.jwtService.verify(token);

      if (payload.id !== id) {
        throw new ForbiddenException('Token o usuario invalidos');
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async getCount() {
    const count = this.prisma.user.count();
    return count;
  }
}
