import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partos',
  templateUrl: './partos.component.html',
  styleUrls: ['./partos.component.css']
})
export class PartosComponent {
  urlPartos:       string = `${urlApi}/partos`
  urlTipoPartos:   string = `${urlApi}/tipos-parto`
  urlDoctores:        string = `${urlApi}/doctores`
  urlPacientes:       string = `${urlApi}/pacientes`
  partos: any = []
  doctores: any = []
  pacientes: any = []
  tipoPartos: any = []
  modificarActivo = false
  pacienteSeleccionado = ""
  parto: FormGroup = new FormGroup({
    fecha:  new FormControl('', [
      Validators.required
    ]),
    hora:  new FormControl('', [
      Validators.required
    ]),
    paciente:  new FormControl('', [
      Validators.required
    ]),
    doctor:  new FormControl('', [
      Validators.required
    ]),
    tipoParto:  new FormControl('', [
      Validators.required
    ]),
    pesoBebe:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isWeightValid)
    ])
  })

  constructor(
    private apiRestService: ApiRestService
  ) {}

  ngOnInit(): void {
    this.obtenerPartos()
    this.obtenerDoctores()
    this.obtenerPacientes()
    this.obtenerTipoPartos()
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
    const campo = this.parto.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if(campo?.value === "" && fueTocado) return false
    if(campo?.value === "") return true
    if(campo?.value !== "" && esValido) return true
    return false
  }

  obtenerPartos() {
    this.apiRestService.doGet(this.urlPartos).subscribe((response: any) => {
      this.partos = response
    })
  }

  obtenerTipoPartos() {
    this.apiRestService.doGet(this.urlTipoPartos).subscribe((response: any) => {
      this.tipoPartos = response
    })
  }

  activarModificar(idParto:string) {
    const path = `${this.urlPartos}/${idParto}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if(response) {
        this.parto.get("fecha")?.setValue(response.fecha)
        this.parto.get("hora")?.setValue(response.hora)
        this.parto.get("paciente")?.setValue(response.paciente)
        this.parto.get("doctor")?.setValue(response.doctor)
        this.parto.get("tipoParto")?.setValue(response.tipoParto)
        this.parto.get("pesoBebe")?.setValue(response.pesoBebe)
      }
    })
    this.pacienteSeleccionado = idParto
    this.modificarActivo = true
  }

  actualizarParto() {
    if(this.parto.valid) {
      const path = `${this.urlPartos}/${this.pacienteSeleccionado}`
      this.apiRestService.doPut(path, this.parto.value).subscribe((response: any) => {
        if(response._id) {
          this.obtenerPartos()
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
    const controls = Object.keys(this.parto.controls);
    controls.forEach(key => {
      const control = this.parto.get(key);
      if(control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarParto() {
    if(this.parto.valid) {
      this.apiRestService.doPost(this.urlPartos, this.parto.value).subscribe((response: any) => {
        if(response._id) {
          this.resetearForm()
          this.obtenerPartos()
          Swal.fire("OK", "Paciente agregado correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarParto(idParto: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este parto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const path = `${this.urlPartos}/${idParto}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if(response.message) {
            this.resetearForm()
            this.obtenerPartos()
            Swal.fire("Eliminada", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
  }
}
