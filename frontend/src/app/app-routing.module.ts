import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoComponent } from './components/acceso/acceso.component';
import { SistemaComponent } from './components/sistema/sistema.component';
import { AccesoGuard } from './guards/acceso.guard';
import { SistemaGuard } from './guards/sistema.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { InscritosComponent } from './components/inscritos/inscritos.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/acceso",
    pathMatch: "full"
  },
  {
    path: "acceso",
    component: AccesoComponent,
    canActivate: [SistemaGuard]
  },
  {
    path:"sistema", component: SistemaComponent,
    canActivate: [
      AccesoGuard
    ],
    children: [
      {
        path: "",
        redirectTo: "/sistema/cursos",
        pathMatch: "full"
      },
      
      {
        path: "cursos",
        component: CursosComponent
      },
      {
        path: "solicitudes",
        component: SolicitudesComponent
      },
      {
        path: "pagos",
        component: PagosComponent
      },
      {
        path: "inscritos",
        component: InscritosComponent
      },
      {
        path: "registro",
        component: RegistroComponent
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
