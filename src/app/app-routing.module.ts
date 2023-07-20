import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { HomeComponent } from './home/home.component';
//import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/cursos/cursos.component';
import { SignupComponent } from './signup/signup.component';
import { PadreComponent } from './padre/padre.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from './auth.guard';
import { InscritosComponent } from './components/inscritos/inscritos.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: PadreComponent,
  children: [
    { path: 'solicitudes', component: SolicitudesComponent },
    { path: 'clientes', component: InscritosComponent },
    { path: 'cursos', component: ProductosComponent },
    { path: 'dashboard', component: DashboardComponent },
  ],


  //canActivate: [AuthGuard],
 },
  { path: 'login', component: SignupComponent,
  },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'dashboard'} //significa cualquier ruta que no este definida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
