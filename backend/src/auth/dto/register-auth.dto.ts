import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  name: string;
}
