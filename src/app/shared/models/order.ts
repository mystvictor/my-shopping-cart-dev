import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;   
  items: any[];
  delivered: boolean;
  totalOrder: number;

  constructor(public userId: string, public customer: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.totalOrder = shoppingCart.totalPrice;
    this.delivered = false;
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          code: i.code,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    });
       
  } 
}
