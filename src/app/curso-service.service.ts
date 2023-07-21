import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  [x: string]: any;
   private apiUrl = environment.apiUrl + '/cursos';// URL del API para cursos

  constructor(private http: HttpClient) { }

  // Obtener todos los cursos
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  // Agregar un nuevo curso
  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  // Actualizar un curso existente
  actualizarCurso(id: string, curso: Curso): Observable<Curso> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Curso>(url, curso);
  }

  // Eliminar un curso
  eliminarCurso(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
