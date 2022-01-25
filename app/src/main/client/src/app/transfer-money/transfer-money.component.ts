import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccountTo} from "../general/To/accountTo";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {

  error = false;
  accountsFrom: FormControl;
  accountsTarget: FormControl;
  form: FormGroup = new FormGroup({});
  accounts: AccountTo[] = [];
  value: number | undefined;

  constructor(private readonly router: Router, private httpClient: HttpClient,private snackBar: MatSnackBar) {
    this.value = 0;
    this.accountsFrom = new FormControl(null);
    this.accountsTarget = new FormControl(null);
    this.form.addControl('accountsFrom', this.accountsFrom);
    this.form.addControl('accountsTarget', this.accountsTarget);
    this.form.addControl('currentValue', new FormControl(0, Validators.required));

  }

  ngOnInit(): void {
    this.getAllAccounts().subscribe((value => {
      this.accounts = value
    }))
  }

  submit() {
    let withdrawal = this.form.value.currentValue;
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value.currentValue);
    console.log(this.form.value.accountsFrom.currentValue)
    if(this.form.value.accountsFrom === this.form.value.accountsTarget){
      this.snackBar.open("You CANT transfer money between the same account")
      this.form.reset();
      return;
    }
    if(this.form.value.currentValue > this.form.value.accountsFrom.currentValue){
      this.snackBar.open("You CANT transfer that much money")
      this.form.reset();
      return;
    }
    let minusAccount: AccountTo = this.form.value.accountsFrom;
    let plusAccount: AccountTo = this.form.value.accountsTarget;
    if(minusAccount.currentValue){

    minusAccount.currentValue = minusAccount.currentValue - withdrawal;
    plusAccount.currentValue = plusAccount.currentValue + withdrawal;


      this.changeAccountValue(this.form.value.accountsFrom.id, minusAccount).subscribe((x) =>{
      })
      this.changeAccountValue(this.form.value.accountsTarget.id, plusAccount).subscribe((x) =>{
        this.router.navigateByUrl('app/home')
      })
      }
    }




  goBack() {
    this.router.navigateByUrl('app/home')

  }

  getAllAccounts(): Observable<AccountTo[]> {
    return this.httpClient.get<AccountTo[]>(`${environment.apiUrl}/accounts`);
  }

  changeAccountValue(id: number, account: AccountTo): Observable<AccountTo>{
    return this.httpClient.post<AccountTo>(`${environment.apiUrl}/account/${id}`,account );
  }
}
