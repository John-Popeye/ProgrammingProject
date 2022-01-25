import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {HomeComponent} from "./home/home.component";
import {DepositComponent} from "./deposit-money/deposit.component";
import {TransferMoneyComponent} from "./transfer-money/transfer-money.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {WithdrawComponent} from "./withdraw-money/withdraw.component";
import {AuthGuard} from "./general/services/auth-guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },

  {path: 'app',
    canActivate: [AuthGuard] ,
  children: [
  { path: 'home', component: HomeComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'transfer', component: TransferMoneyComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'withdraw', component: WithdrawComponent }
  ]}
];

@NgModule({
  exports: [ RouterModule ],
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
