
import { AppUser } from '../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { UserService } from '../security/user.service';
import { AuthService } from '../security/auth.service';

@Injectable()
export class AccountService {

  constructor(private db: AngularFireDatabase) { }

  create(key: string, balance: number) {
    return this.db.object('/accounts/' + key).update({ balance: balance });
  }

  addCredit(balance: number, credit: number) {
    var solde = balance + credit;
    
  }

}
