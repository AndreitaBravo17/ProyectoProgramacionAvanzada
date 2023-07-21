import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CursoService } from 'src/app/curso-service.service';
import { Curso } from 'src/app/interfaces/usuario';
//import { UsuarioServiceService } from '../services/usuario-service.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class ProductosComponent implements OnInit {
  form: FormGroup;
  cursosRegistrados: Curso[] = [];

constructor(
  private formBuilder: FormBuilder,
  private cursoService: CursoService // Inyectar el servicio CursoService
) {
  this.buildForm();
}


  ngOnInit(): void {
    // Llamar al método para obtener los cursos registrados
    this.getCursosRegistrados();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      productoCtrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
      costoCtrl: new FormControl('', [Validators.required]),
      horasCtrl: new FormControl('', [Validators.required]),
      modalidadCtrl: new FormControl('', [Validators.required]),
      inicioCtrl: new FormControl('', [Validators.required]),
      finalizaCtrl: new FormControl('', [Validators.required]),
    });
  }

  public save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const nuevoCurso: Curso = {
        nombre: this.form.value.productoCtrl,
        costo: this.form.value.costoCtrl,
        horas: this.form.value.horasCtrl,
        modalidad: this.form.value.modalidadCtrl,
        inicio: this.form.value.inicioCtrl,
        finaliza: this.form.value.finalizaCtrl,
      };

      // Llamar al método para guardar el curso en la base de datos
      this.registrarCurso(nuevoCurso);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private getCursosRegistrados() {
    // Llamar al método del servicio para obtener los cursos registrados
    this.cursoService.getCursos().subscribe(
      (data: Curso[]) => {
        this.cursosRegistrados = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  private registrarCurso(curso: Curso) {
    // Llamar al método del servicio para registrar el curso en la base de datos
    this.cursoService.registrarCurso(curso).subscribe(
      () => {
        // Actualizar la lista de cursos registrados y limpiar el formulario
        this.getCursosRegistrados();
        this.form.reset();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
