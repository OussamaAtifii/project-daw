import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  name: string;
}
