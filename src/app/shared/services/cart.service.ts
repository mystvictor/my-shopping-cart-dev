
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'; 
import 'rxjs/add/operator/map'; 


@Injectable()
export class CartService {

  private basePath: string = '/shopping-carts/';
  
    constructor(private db: AngularFireDatabase) { }

    async getCart(): Promise<Observable<ShoppingCart>> {
      let cartKey = await this.getOrCreateCartKey();
      return this.db.object(this.basePath + cartKey)
        .map(x => new ShoppingCart(x.items));
    }
  
    async addToCart(product: Product) {
      this.updateItem(product, 1);
    } 
  
    async removeFromCart(product: Product) {
      this.updateItem(product, -1);
    } 

    async clearCart() { 
      let cartKey = await this.getOrCreateCartKey();
      this.db.object('/shopping-carts/' + cartKey + '/items').remove();
    }

    private create() {
      return this.db.list(this.basePath).push({
        createdOn: new Date().getTime()
      });
    }
  
    private getItem(cartKey: string, productKey: string) {
      return this.db.object(this.basePath + cartKey + '/items/' + productKey);
    }
  
    private async getOrCreateCartKey(): Promise<string> {
      let cartKey = localStorage.getItem('cartKey');
      if(cartKey) return cartKey;
  
      let response = await this.create();
      localStorage.setItem('cartKey', response.key);
      return response.key;  
    }
  
    private async updateItem(product: Product, change: number) {
      let cartKey = await this.getOrCreateCartKey();
      let item$ = this.getItem(cartKey, product.$key);
      item$.take(1).subscribe(item => {
        let quantity = (item.quantity || 0) + change;
        if(quantity === 0) item$.remove();
        else
        item$.update({ 
          title: product.title,
          code: product.code,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantity
        });
      });
    }

}
