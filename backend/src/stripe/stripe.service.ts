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
        amount: +totalPrice.toFixed(2) * 100,
        currency: 'eur',
        payment_method_types: ['card'],
      });
    } catch (error) {
      console.log(error);
    }

    // return this.stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: cart.map((item) => ({
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: item.name,
    //       },
    //       unit_amount: item.price,
    //     },
    //     quantity: item.quantity,
    //   })),
    //   mode: 'payment',
    //   success_url: 'https://example.com/success',
    //   cancel_url: 'https://example.com/cancel',
    // });
  }
}
