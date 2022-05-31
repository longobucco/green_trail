import {Component} from '@angular/core';
import {GoogleAuth} from '@codetrix-studio/capacitor-google-auth';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private router: Router) { }
  ionViewDidEnter() {
    GoogleAuth.initialize();
  }
  checkLoggedIn() {
    GoogleAuth.refresh().then((data) => {
      if (data.accessToken) {
        const navigationExtras: NavigationExtras = {
          state: {
            user: { type: 'existing', accessToken: data.accessToken, idToken: data.idToken }
          }
        };
        this.router.navigate(['landing'], navigationExtras);
      }
    }).catch(e => {
      if (e.type === 'userLoggedOut') {
        this.doLogin();
      }
    });
  }
  async doLogin() {
    const user = await GoogleAuth.signIn();
    if (user) {
      this.goToHome(user);
    }
  }
  goToHome(user) {
    const navigationExtras: NavigationExtras = { state: { user } };
    this.router.navigate(['landing'], navigationExtras);
  }



}
