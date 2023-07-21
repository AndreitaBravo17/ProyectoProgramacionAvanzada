import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  urlPacientes:       string = `${urlApi}/pacientes`
  pacientes: any = []
  modificarActivo = false
  pacienteSeleccionado = ""
  paciente: FormGroup = new FormGroup({
    cedula:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidDNI)
    ]),
    nombre:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNAME)
    ]),
    edad:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidAge)
    ]),
    direccion:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidText)
    ]),
    telefono:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidTelephone)
    ])
  })

  constructor(
    private apiRestService: ApiRestService
  ) {}

  ngOnInit(): void {
    this.obtenerPacientes()
  }

  mensajeError(input: string) {
    const campo = this.paciente.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if(campo?.value === "" && fueTocado) return false
    if(campo?.value === "") return true
    if(campo?.value !== "" && esValido) return true
    return false
  }

  obtenerPacientes() {
    this.apiRestService.doGet(this.urlPacientes).subscribe((response: any) => {
      this.pacientes = response
    })
  }

  activarModificar(idPaciente:string) {
    const path = `${this.urlPacientes}/${idPaciente}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if(response) {
        this.paciente.get("cedula")?.setValue(response.cedula)
        this.paciente.get("nombre")?.setValue(response.nombre)
        this.paciente.get("edad")?.setValue(response.edad)
        this.paciente.get("direccion")?.setValue(response.direccion)
        this.paciente.get("telefono")?.setValue(response.telefono)
      }
    })
    this.pacienteSeleccionado = idPaciente
    this.modificarActivo = true
  }

  actualizarPaciente() {
    if(this.paciente.valid) {
      const path = `${this.urlPacientes}/${this.pacienteSeleccionado}`
      this.apiRestService.doPut(path, this.paciente.value).subscribe((response: any) => {
        if(response._id) {
          this.obtenerPacientes()
          this.resetearForm()
          Swal.fire("OK", "Consulta actualizada correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  resetearForm() {
    const controls = Object.keys(this.paciente.controls);
    controls.forEach(key => {
      const control = this.paciente.get(key);
      if(control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarPaciente() {
    if(this.paciente.valid) {
      this.apiRestService.doPost(this.urlPacientes, this.paciente.value).subscribe((response: any) => {
        if(response._id) {
          this.resetearForm()
          this.obtenerPacientes()
          Swal.fire("OK", "Paciente agregado correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarConsulta(idPaciente: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este paciente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const path = `${this.urlPacientes}/${idPaciente}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if(response.message) {
            this.resetearForm()
            this.obtenerPacientes()
            Swal.fire("Eliminada", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
  }
}
