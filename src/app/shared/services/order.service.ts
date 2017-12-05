import { CartService } from './cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase, private cartService: CartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  get orders() {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'datePlaced'
      }
    });
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  get(key) {
    return this.db.object('/orders/' + key);
  }

  update(key, order) {
    return this.db.object('/orders/' + key).update(order);
  }

}
