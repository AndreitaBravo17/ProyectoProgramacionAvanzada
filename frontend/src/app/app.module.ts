import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SistemaComponent } from './components/sistema/sistema.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { DoctoresComponent } from './components/doctores/doctores.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { PartosComponent } from './components/partos/partos.component';
import { RecienNacidosComponent } from './components/recien-nacidos/recien-nacidos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { InscritosComponent } from './components/inscritos/inscritos.component';


@NgModule({
  declarations: [
    AppComponent,
    AccesoComponent,
    SistemaComponent,
    NotFoundComponent,
    CursosComponent,
    RegistroComponent,
    PacientesComponent,
    DoctoresComponent,
    ConsultasComponent,
    HabitacionesComponent,
    PartosComponent,
    RecienNacidosComponent,
    SolicitudesComponent,
    PagosComponent,
    InscritosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
