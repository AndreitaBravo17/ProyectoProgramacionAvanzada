import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { CursosService } from 'src/app/services/cursos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
}) 
export class RegistroComponent {
  urlRegistro: string = `${urlApi}/registro`
  urlCursos: string = `${urlApi}/cursos`

  registros: any = []
  cursos: any = []
  modificarActivo = false
  registroSeleccionado = ""
  registro: FormGroup = new FormGroup({
    cedula: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidDNI)
    ]),
    nombres: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNAME)
    ]),
    apellidos: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNAME)
    ]),
    provincia: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidProvincia)
    ]),
    edad: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidAge)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidTelephone)
    ]),
    correo: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidEmail)
    ]),
    genero: new FormControl('', [
      Validators.required
    ]),
    cursos: new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private apiRestService: ApiRestService,
    private cursosService: CursosService,
    private solicitudesService: SolicitudesService
  ) { }

  ngOnInit(): void {
    this.obtenerRegistro()
    this.obtenerCursos()
  }

  mensajeError(input: string) {
    const campo = this.registro.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if (campo?.value === "" && fueTocado) return false
    if (campo?.value === "") return true
    if (campo?.value !== "" && esValido) return true
    return false
  }

  obtenerCursos() {
    this.apiRestService.doGet(this.urlCursos).subscribe((response: any) => {
      this.cursos = response
    })
  }

  obtenerRegistro() {
    this.apiRestService.doGet(this.urlRegistro).subscribe(
      (response: any) => {
        this.registros = response
      })
  }

  activarModificar(idRegistro: string) {
    const path = `${this.urlRegistro}/${idRegistro}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if (response) {
        this.registro.get("cedula")?.setValue(response.cedula)
        this.registro.get("nombres")?.setValue(response.nombres)
        this.registro.get("apellidos")?.setValue(response.apellidos)
        this.registro.get("provincia")?.setValue(response.provincia)
        this.registro.get("edad")?.setValue(response.edad)
        this.registro.get("telefono")?.setValue(response.telefono)
        this.registro.get("correo")?.setValue(response.correo)
        this.registro.get("genero")?.setValue(response.genero)
        this.registro.get("cursos")?.setValue(response.cursos)
      }
    })
    this.registroSeleccionado = idRegistro
    this.modificarActivo = true
  }

  actualizarRegistro() {
    if (this.registro.valid) {
      const path = `${this.urlRegistro}/${this.registroSeleccionado}`
      this.apiRestService.doPut(path, this.registro.value).subscribe((response: any) => {
        if (response._id) {
          this.obtenerRegistro()
          this.resetearForm()
          Swal.fire("OK", "Registro actualizada correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  resetearForm() {
    const controls = Object.keys(this.registro.controls);
    controls.forEach(key => {
      const control = this.registro.get(key);
      if (control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarRegistro() {
    if (this.registro.valid) {
      this.solicitudesService.guardarRegistro(this.registro.value);
      this.apiRestService.doPost(this.urlRegistro, this.registro.value).subscribe((response: any) => {
        if (response._id) {
          this.resetearForm()
          this.obtenerRegistro()

          Swal.fire({
            title: 'Registro exitoso',
            text: `Se ha registrado correctamente. Pronto recibirá un correo sobre su solicitud`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarRegistro(idRegistro: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este Registro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const path = `${this.urlRegistro}/${idRegistro}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if (response.message) {
            this.resetearForm()
            this.obtenerRegistro()
            Swal.fire("Eliminada", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
  }
}