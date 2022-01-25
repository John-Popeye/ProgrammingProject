import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../general/services/account.service";
import {AccountTo} from "../general/To/accountTo";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginCredensials} from "../general/To/loginCredensials";
import {environment} from "../../environments/environment";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = "Jan"

  displayedColumns: string[] = ['id', 'name', 'type', 'currentValue'];
  accounts: AccountTo[];


  constructor(private readonly router: Router, private accountService: AccountService, private httpClient: HttpClient) {
    this.accounts = [];
    this.getAllAccounts().subscribe((value => {
      this.accounts = value;
    }))
  }

  ngOnInit(): void {
    if(this.accountService.isLoggedIn()){
      this.router.navigateByUrl('app/home');
    }

  }
  goToWithdraw(){
    this.router.navigateByUrl('app/withdraw');
  }
  goToCreateAccount(){
    this.router.navigateByUrl('app/create-account');
  }
  goToDeposit(){
    this.router.navigateByUrl('app/deposit');
  }
  goToTransfer(){
    this.router.navigateByUrl('app/transfer');
  }
  logOut(){
    this.accountService.logOut();
    this.router.navigateByUrl('/login')
  }

  getAllAccounts(): Observable<AccountTo[]>{
   return this.httpClient.get<AccountTo[]>(`${environment.apiUrl}/accounts`);
  }




}
