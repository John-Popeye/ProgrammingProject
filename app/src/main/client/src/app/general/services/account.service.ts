import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn=  false;



  logIn(){
    this.loggedIn = true;
  }

  logOut(){
    this.loggedIn = false;
  }
  isLoggedIn(){
    return this.loggedIn;
  }


}
