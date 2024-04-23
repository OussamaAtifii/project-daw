import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  name: string;

  @MaxLength(255)
  @MinLength(10)
  @IsString()
  shortDesc: string;

  @IsOptional()
  @MaxLength(1000)
  @IsString()
  longDesc: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsInt()
  stockQty: number;

  @IsNumber()
  brandId: number;

  @IsNumber()
  categoryId: number;
}
