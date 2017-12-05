import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  get categories() {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
