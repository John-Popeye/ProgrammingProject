import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
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
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  error = false;
  account: FormControl;
  form: FormGroup = new FormGroup({});
  accounts: AccountTo[] = [];
  value: number | undefined;

  constructor(private readonly router: Router, private httpClient: HttpClient,private snackBar: MatSnackBar) {
    this.value = 0;
    this.account = new FormControl(null);
    this.form.addControl('account', this.account);
    this.form.addControl('currentValue', new FormControl(0, Validators.required));

  }

  ngOnInit(): void {
    this.getAllAccounts().subscribe((value => {
      this.accounts = value
    }))
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return;
    }

    let returnAccount: AccountTo = this.form.value.account;
    if(returnAccount.currentValue) {
      returnAccount.currentValue += this.form.value.currentValue;
      this.changeAccountValue(this.form.value.account.id, returnAccount).subscribe((x) =>{
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
