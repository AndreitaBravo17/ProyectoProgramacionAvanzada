import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos: any[] = [];

  constructor() { }

  setCursos(cursos: any[]) {
    this.cursos = cursos;
  }

  getCursos() {
    return this.cursos;
  }

}
