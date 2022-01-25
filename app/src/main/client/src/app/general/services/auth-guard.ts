import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AccountService} from "./account.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService,private snackBar: MatSnackBar) {};

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.accountService.isLoggedIn()) {
      return true;
    } else {
      this.snackBar.open("YOU MUST BE LOGGED IN TO ENTER THIS APP")
      return false;
    }
  }
}
