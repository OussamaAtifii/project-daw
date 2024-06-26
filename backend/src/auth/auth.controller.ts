import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: RegisterAuthDto) {
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: LoginAuthDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  // TODO: Add the correct type for the token and user parameters
  validateToken(@Body() userInfo: any) {
    return this.authService.validateToken(userInfo);
  }

  @Get('count')
  getCount() {
    return this.authService.getCount();
  }
}
