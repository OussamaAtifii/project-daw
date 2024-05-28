import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    console.log('eto es el total', createOrderDto.total);

    const productIds = createOrderDto.cart.map((product) => ({
      product: { connect: { id: product.id } },
    }));

    const order = await this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        products: {
          create: productIds,
        },
        total: createOrderDto.total,
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

  async getCount() {
    const count = await this.prisma.order.count();
    return count;
  }

  async getRecent() {
    const orders = await this.prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  }

  async findByUser(userId: number) {
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
