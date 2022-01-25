import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../general/services/account.service";
import {first, Observable} from "rxjs";
import {LoginCredensials} from "../general/To/loginCredensials";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  error = false;
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(private httpClient: HttpClient,private route: ActivatedRoute,
              private readonly router: Router,private snackBar: MatSnackBar,
              private formBuilder: FormBuilder, private accountService: AccountService) {
    this.form = this.formBuilder.group({
      name: [''],
      password: ['']
    });

  }

  ngOnInit(): void {

  }

  submit(){
    if (this.form.invalid) {
      return;
    }
    this.checkLoginCredensials(new LoginCredensials(this.form.value.name, this.form.value.password)).subscribe((result) =>{
      if(result){
        this.accountService.logIn();
        this.goToHome();
        return;
      }
      if(!result){
        this.snackBar.open("Wrong Username And/Or Password")
      }
    })

  }



  goToRegister(){
    this.router.navigateByUrl('register');
  }
  goToHome(){
    this.router.navigateByUrl('app/home');
  }

  checkLoginCredensials(loginCredensials: LoginCredensials): Observable<Boolean> {
    return this.httpClient.post<Boolean>(`${environment.apiUrl}/login`, loginCredensials)
  }

}
