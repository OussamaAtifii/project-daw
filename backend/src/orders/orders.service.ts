import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);

    const productIds = createOrderDto.cart.map((product) => ({
      product: { connect: { id: product.id } },
    }));

    const order = await this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        products: {
          create: productIds,
        },
      },
    });

    return order;
  }
  async findAll() {
    const ordersWithProducts = await this.prisma.order.findMany({
      include: {
        products: true,
      },
    });

    return ordersWithProducts;
  }

  async findByUser(userId: string) {
    const orders = await this.prisma.order.findMany({
      include: {
        products: true,
      },
      where: {
        userId: userId,
      },
    });

    return orders;
  }
}
