import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateOrderDto {
  userId: string;
  cart: CreateProductDto[];
}
