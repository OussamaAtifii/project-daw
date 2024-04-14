import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(3)
  @IsString()
  name: string;

  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  desc: string;
}
