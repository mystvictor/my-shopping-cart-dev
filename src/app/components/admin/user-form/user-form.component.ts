import { AppUser } from '../../../shared/models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/security/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/security/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  key;
  appUser: AppUser;

  constructor(private auth: AuthService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.key = this.route.snapshot.paramMap.get('id');
    if (this.key) this.userService.get(this.key).take(1).subscribe(u => this.appUser = u);
  }

  ngOnInit() {
  }

  save(appUser) {
    if(this.key) this.userService.update(this.key, appUser);
    this.router.navigate(['/admin/users']);
  }

}
