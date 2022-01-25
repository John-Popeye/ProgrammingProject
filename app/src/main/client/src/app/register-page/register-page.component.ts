import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first, Observable} from "rxjs";
import {AccountService} from "../general/services/account.service";
import {Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginCredensials} from "../general/To/loginCredensials";


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  error = false;
  form: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private httpClient: HttpClient) {


    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if(this.form.value.password !== this.form.value.passwordConfirmation){
     this.snackBar.open('Password and Password Confirmation must be the same!');
     this.form.reset();
     return;
    }


    this.addLoginCredensials(new LoginCredensials(this.form.value.name, this.form.value.password)).subscribe((value =>
    {console.log(value);
    this.router.navigateByUrl('/login');}
    ));




  }

  addLoginCredensials(loginCredensials: LoginCredensials): Observable<LoginCredensials> {
    return this.httpClient.post<LoginCredensials>(`${environment.apiUrl}/register`, loginCredensials)
  }

}
