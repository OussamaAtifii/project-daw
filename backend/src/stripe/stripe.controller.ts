import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';

@Controller('checkout')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  create(@Body() createStripeDto: CreateStripeDto[]) {
    return this.stripeService.checkout(createStripeDto);
  }
}
