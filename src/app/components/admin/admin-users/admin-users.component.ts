import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';

import { UserService } from '../../../shared/security/user.service';
import { AppUser } from '../../../shared/models/app-user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  appUsers: AppUser[];
  tableResource: DataTableResource<AppUser>;
  items: AppUser[] = [];
  itemCount: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.users.subscribe(users => {
      this.appUsers = users;
      this.initTable(users);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }

  filter(query: string) {
    let filtered = (query) ? this.appUsers.filter(u => u.email.toLowerCase().includes(query.toLowerCase())) : this.appUsers;
    this.initTable(filtered);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);  
  }

  private initTable(appUsers: AppUser[]) {
    this.tableResource = new DataTableResource(appUsers);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

}
