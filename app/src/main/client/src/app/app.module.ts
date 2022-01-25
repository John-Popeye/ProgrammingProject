import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DepositComponent } from './deposit-money/deposit.component';
import { WithdrawComponent } from './withdraw-money/withdraw.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from "./general/angular-material.module";
import { RegisterPageComponent } from './register-page/register-page.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {AccountService} from "./general/services/account.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./general/services/auth-guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    CreateAccountComponent,
    DepositComponent,
    WithdrawComponent,
    TransferMoneyComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AccountService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
