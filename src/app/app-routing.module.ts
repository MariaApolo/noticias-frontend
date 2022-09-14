import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtiquetadorComponent } from './components/etiquetador/etiquetador.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import  { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes =[
  { path: '', component: LandingComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'etiquetador', component: EtiquetadorComponent /*, canActivate: [AuthGuard]*/},
  { path: 'registro', component: RegisterComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
