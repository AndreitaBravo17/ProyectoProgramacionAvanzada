import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private registrosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  registros$: Observable<any[]> = this.registrosSubject.asObservable();

  datosSolicitud: any;
  constructor() { }

  guardarRegistro(registro: any) {
    const registros = this.registrosSubject.getValue();
    registros.push(registro);
    this.registrosSubject.next(registros);
  }

  guardarDatosSolicitud(datos: any) {
    this.datosSolicitud = datos;
  }

  obtenerDatosSolicitud() {
    return this.datosSolicitud;
  }

}

  
