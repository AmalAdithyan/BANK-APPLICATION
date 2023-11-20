import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { DataService } from './services/data.service';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  //aadhyam kanenda page or contentinde path empty ayit kodukkanam also use comma at the end beforre ssetting other path
  { path: 'dashboard', component: DashboardComponent },  //oru pathile oru page kodukkan patoolu vere page varanamemngi vere path set cheyanam 
  { path: 'register' , component :RegisterComponent},
  { path: 'services' , component: DataService},
  { path: 'transaction' , component:TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
