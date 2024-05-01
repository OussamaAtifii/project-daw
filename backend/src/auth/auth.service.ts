import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterAuthDto): Promise<User> {
    const { password, name, email } = credentials;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('User already exists');
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

      return createdUser;
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
      token,
    };

    return data;
  }

  async validateToken() {
    return true;
  }
}
