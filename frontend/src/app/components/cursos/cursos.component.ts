import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { CursosService } from 'src/app/services/cursos.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  urlCursos:       string = `${urlApi}/cursos`
  cursos: any = []
  modificarActivo = false
  cursoSeleccionado = ""
  curso: FormGroup = new FormGroup({
    nombreCurso:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNAME)
    ]),
    modalidad:  new FormControl('', [
      Validators.required
    ]),
    costo:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNumber)
    ]),
    horas:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNumber)
    ]),
    fechaInicio:  new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private apiRestService: ApiRestService, 
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.obtenerCursos()
    this.cursosService.setCursos(this.cursos);
  }

  mensajeError(input: string) {
    const campo = this.curso.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if(campo?.value === "" && fueTocado) return false
    if(campo?.value === "") return true
    if(campo?.value !== "" && esValido) return true
    return false
  }

  obtenerCursos() {
    this.apiRestService.doGet(this.urlCursos).subscribe((response: any) => {
      this.cursos = response
    })
  }

  activarModificar(idCurso:string) {
    const path = `${this.urlCursos}/${idCurso}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if(response) {
        this.curso.get("nombreCurso")?.setValue(response.nombreCurso)
        this.curso.get("modalidad")?.setValue(response.modalidad)
        this.curso.get("costo")?.setValue(response.costo)
        this.curso.get("horas")?.setValue(response.horas)
        this.curso.get("fechaInicio")?.setValue(response.fechaInicio)
      }
    })
    this.cursoSeleccionado = idCurso
    this.modificarActivo = true
  }

  actualizarCurso() {
    if(this.curso.valid) {
      const path = `${this.urlCursos}/${this.cursoSeleccionado}`
      this.apiRestService.doPut(path, this.curso.value).subscribe((response: any) => {
        if(response._id) {
          this.obtenerCursos()
          this.resetearForm()
          Swal.fire("OK", "Curso actualizada correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  resetearForm() {
    const controls = Object.keys(this.curso.controls);
    controls.forEach(key => {
      const control = this.curso.get(key);
      if(control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarCurso() {
    if(this.curso.valid) {
      this.apiRestService.doPost(this.urlCursos, this.curso.value).subscribe((response: any) => {
        if(response._id) {
          this.resetearForm()
          this.obtenerCursos()
          Swal.fire("OK", "Curso agregado correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarCurso(idCurso: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este curso?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const path = `${this.urlCursos}/${idCurso}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if(response.message) {
            this.resetearForm()
            this.obtenerCursos()
            Swal.fire("Eliminada", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
}
}
