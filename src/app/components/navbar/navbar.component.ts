import { CartService } from '../../shared/services/cart.service';
import { Observable } from 'rxjs/Rx';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppUser } from '../../shared/models/app-user';
import { AuthService } from '../../shared/security/auth.service';
import { ShoppingCart } from '../../shared/models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private toggleButton: any;
  private sidebarVisible: boolean;

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private element : ElementRef, private auth: AuthService, private cartService: CartService) { }

  async ngOnInit() {
    this.sidebarVisible = false;
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function(){
        toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
};

sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    //this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
};

sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
};

  loginWithGoogle() {
    this.auth.login();
  }

  loginWithFacebook() {
    this.auth.loginWithFacebook();
  }

  logout() {
    this.auth.logout();
  }

}
