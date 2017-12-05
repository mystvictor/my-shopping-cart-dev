
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { AppUser } from '../models/app-user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  get users() {
    return this.db.list('users');
  }

  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      imageUrl: user.photoURL
    });
  }

  update(key, appUser) {
    return this.db.object('/users/' + key).update(appUser);
  }

  delete(key) {
    return this.db.object('/users/' + key).remove();
  }

}
