import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';

import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  checkout(cart: CreateStripeDto[]) {
    console.log(cart);

    try {
      const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      console.log(totalPrice);

      return this.stripe.paymentIntents.create({
        amount: +(totalPrice * 100).toFixed(2),
        currency: 'eur',
        payment_method_types: ['card'],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
