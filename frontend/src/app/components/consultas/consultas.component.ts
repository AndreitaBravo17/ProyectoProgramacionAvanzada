import { Component, OnInit } from '@angular/core';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { urlApi } from 'src/app/constants/index'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  urlDoctores:        string = `${urlApi}/doctores`
  urlPacientes:       string = `${urlApi}/pacientes`
  urlConsultas:       string = `${urlApi}/consultas`
  doctores: any = []
  pacientes: any = []
  consultas: any = []
  modificarActivo = false
  consultaSeleccionada = ""
  consulta: FormGroup = new FormGroup({
    fecha:  new FormControl('', [
      Validators.required
    ]),
    hora:  new FormControl('', [
      Validators.required,
    ]),
    doctor:  new FormControl('', [
      Validators.required
    ]),
    paciente:  new FormControl('', [
      Validators.required
    ]),
    sintomas:  new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private apiRestService: ApiRestService
  ) {}

  ngOnInit(): void {
    this.obtenerDoctores()
    this.obtenerPacientes()
    this.obtenerConsultas()
  }

  obtenerDoctores() {
    this.apiRestService.doGet(this.urlDoctores).subscribe((response: any) => {
      this.doctores = response
    })
  }

  obtenerPacientes() {
    this.apiRestService.doGet(this.urlPacientes).subscribe((response: any) => {
      this.pacientes = response
    })
  }

  mensajeError(input: string) {
    const campo = this.consulta.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if(campo?.value === "" && fueTocado) return false
    if(campo?.value === "") return true
    if(campo?.value !== "" && esValido) return true
    return false
  }

  obtenerConsultas() {
    this.apiRestService.doGet(this.urlConsultas).subscribe((response: any) => {
      this.consultas = response
    })
  }

  activarModificar(idConsulta:string) {
    const path = `${this.urlConsultas}/${idConsulta}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if(response) {
        this.consulta.get("fecha")?.setValue(response.fecha)
        this.consulta.get("hora")?.setValue(response.hora)
        this.consulta.get("doctor")?.setValue(response.doctor)
        this.consulta.get("paciente")?.setValue(response.paciente)
        this.consulta.get("sintomas")?.setValue(response.sintomas)
      }
    })
    this.consultaSeleccionada = idConsulta
    this.modificarActivo = true
  }

  actualizarConsulta() {
    if(this.consulta.valid) {
      const path = `${this.urlConsultas}/${this.consultaSeleccionada}`
      this.apiRestService.doPut(path, this.consulta.value).subscribe((response: any) => {
        if(response._id) {
          this.resetearForm()
          this.obtenerConsultas()
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
    const controls = Object.keys(this.consulta.controls);
    controls.forEach(key => {
      const control = this.consulta.get(key);
      if(control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarConsulta() {
    if(this.consulta.valid) {
      this.apiRestService.doPost(this.urlConsultas, this.consulta.value).subscribe((response: any) => {
        if(response._id) {
          this.resetearForm()
          this.obtenerConsultas()
          Swal.fire("OK", "Consulta creada correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
        Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarConsulta(idConsulta: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta consulta?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const path = `${this.urlConsultas}/${idConsulta}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if(response.message) {
            this.obtenerConsultas()
            this.resetearForm()
            Swal.fire("Eliminada", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
  }
}
