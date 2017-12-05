import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  get products() {
    return this.db.list('/products', {
      query: {
        orderByChild: 'code'
      }
    });
  }

  get(key) {
    return this.db.object('/products/' + key);
  }

  save(product) {
    return this.db.list('/products').push(product);
  }

  update(key, product) {
    return this.db.object('/products/' + key).update(product);
  }

  delete(key) {
    return this.db.object('/products/' + key).remove();
  }

}
