import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @MaxLength(25)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  name: string;
}
