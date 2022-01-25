import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginCredensials} from "../general/To/loginCredensials";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AccountTo} from "../general/To/accountTo";
import {HttpClient} from "@angular/common/http";

interface AccountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  error = false;
  type: FormControl;
  form: FormGroup = new FormGroup({});
  accounts: AccountType[] = [
    {value: 'standard', viewValue: 'Standard'},
    {value: 'saving', viewValue: 'Saving'},
    {value: 'premium', viewValue: 'Premium'},
  ];

  constructor(private readonly router: Router, private readonly httpClient: HttpClient) {
    this.type = new FormControl()
    this.form.addControl('name', new FormControl());
    this.form.addControl('type', this.type);
  }

  ngOnInit(): void {
  }
  submit(){
    console.log(this.form.value.name + ' ' + this.form.value.type);
    this.createNewAccount(new AccountTo(this.form.value.name, this.form.value.type)).subscribe((value => {
      this.router.navigateByUrl('/app/home');
    }))
  }
  goBack(){
    this.router.navigateByUrl('app/home')
  }
  createNewAccount(account: AccountTo): Observable<AccountTo> {
    return this.httpClient.post<AccountTo>(`${environment.apiUrl}/account`, account)
  }
}
