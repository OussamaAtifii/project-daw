import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('count')
  getCount() {
    return this.ordersService.getCount();
  }

  @Get('recent')
  getRecent() {
    return this.ordersService.getRecent();
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: number) {
    return this.ordersService.findByUser(+userId);
  }
}
