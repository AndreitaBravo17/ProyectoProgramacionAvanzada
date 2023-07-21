import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent {
  urlDoctores:       string = `${urlApi}/doctores`
  urlEspecialidades:       string = `${urlApi}/especialidades`
  doctores: any = []
  especialidades: any = []
  modificarActivo = false
  doctorSeleccionado = ""
  doctor: FormGroup = new FormGroup({
    cedula:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidDNI)
    ]),
    nombre:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNAME)
    ]),
    especialidad:  new FormControl('', [
      Validators.required
    ]),
    experiencia:  new FormControl('', [
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
    this.obtenerDoctores()
    this.obtenerEspecialidades()
  }

  mensajeError(input: string) {
    const campo = this.doctor.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if(campo?.value === "" && fueTocado) return false
    if(campo?.value === "") return true
    if(campo?.value !== "" && esValido) return true
    return false
  }

  obtenerDoctores() {
    this.apiRestService.doGet(this.urlDoctores).subscribe((response: any) => {
      this.doctores = response
    })
  }

  obtenerEspecialidades() {
    this.apiRestService.doGet(this.urlEspecialidades).subscribe((response: any) => {
      this.especialidades = response
    })
  }

  activarModificar(idDoctor:string) {
    const path = `${this.urlDoctores}/${idDoctor}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if(response) {
        this.doctor.get("cedula")?.setValue(response.cedula)
        this.doctor.get("nombre")?.setValue(response.nombre)
        this.doctor.get("especialidad")?.setValue(response.especialidad)
        this.doctor.get("experiencia")?.setValue(response.experiencia)
        this.doctor.get("telefono")?.setValue(response.telefono)
      }
    })
    this.doctorSeleccionado = idDoctor
    this.modificarActivo = true
  }

  actualizarDoctor() {
    if(this.doctor.valid) {
      const path = `${this.urlDoctores}/${this.doctorSeleccionado}`
      this.apiRestService.doPut(path, this.doctor.value).subscribe((response: any) => {
        if(response._id) {
          this.obtenerDoctores()
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
    const controls = Object.keys(this.doctor.controls);
    controls.forEach(key => {
      const control = this.doctor.get(key);
      if(control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarDoctor() {
    if(this.doctor.valid) {
      this.apiRestService.doPost(this.urlDoctores, this.doctor.value).subscribe((response: any) => {
        if(response._id) {
          this.resetearForm()
          this.obtenerDoctores()
          Swal.fire("OK", "Paciente agregado correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarConsulta(idDoctor: string) {
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
        const path = `${this.urlDoctores}/${idDoctor}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if(response.message) {
            this.resetearForm()
            this.obtenerDoctores()
            Swal.fire("Eliminada", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
  }
}
