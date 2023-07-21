import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent {
  urlTiposhabitacion:        string = `${urlApi}/tipos-habitacion`
  urlHabitaciones:       string = `${urlApi}/habitaciones`
  tiposHabitacion: any = []
  habitaciones:    any = []
  disponibilidades:  any = [
    {
      id: 1,
      name: "Disponible"
    },
    {
      id: 2,
      name: "Ocupada"
    }
  ]
  modificarActivo = false
  habitacionSeleccionada = ""
  habitacion: FormGroup = new FormGroup({
    numero:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNumber)
    ]),
    tipo:  new FormControl('', [
      Validators.required,
    ]),
    disponibilidad:  new FormControl('', [
      Validators.required
    ]),
    costoDiario:  new FormControl('', [
      Validators.required
    ]),
    equipamento:  new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private apiRestService: ApiRestService
  ) {}

  ngOnInit(): void {
    this.obtenerTiposHabitacion()
    this.obtenerHabitaciones()
  }

  obtenerTiposHabitacion() {
    this.apiRestService.doGet(this.urlTiposhabitacion).subscribe((response: any) => {
      this.tiposHabitacion = response
    })
  }

  obtenerHabitaciones() {
    this.apiRestService.doGet(this.urlHabitaciones).subscribe((response: any) => {
      this.habitaciones = response
      this.habitaciones.map((habitacion:any) => {
        const encontrada = this.disponibilidades.find((d: any) => {
          return habitacion.disponibilidad === d.id
        })
        habitacion.disponibilidad = encontrada.name
        return habitacion
      })
    })
  }

  mensajeError(input: string) {
    const campo = this.habitacion.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if(campo?.value === "" && fueTocado) return false
    if(campo?.value === "") return true
    if(campo?.value !== "" && esValido) return true
    return false
  }

  activarModificar(idHabitacion:string) {
    const path = `${this.urlHabitaciones}/${idHabitacion}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if(response) {
        this.habitacion.get("numero")?.setValue(response.numero)
        this.habitacion.get("tipo")?.setValue(response.tipo)
        this.habitacion.get("disponibilidad")?.setValue(response.disponibilidad)
        this.habitacion.get("costoDiario")?.setValue(response.costoDiario)
        this.habitacion.get("equipamento")?.setValue(response.equipamento)
      }
    })
    this.habitacionSeleccionada = idHabitacion
    this.modificarActivo = true
  }

  actualizarHabitacion() {
    if(this.habitacion.valid) {
      const path = `${this.urlHabitaciones}/${this.habitacionSeleccionada}`
      this.apiRestService.doPut(path, this.habitacion.value).subscribe((response: any) => {
        this.resetearForm()
        this.obtenerHabitaciones()
        if(response._id) {
          Swal.fire("OK", "Habitacion actualizada correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  resetearForm() {
    const controls = Object.keys(this.habitacion.controls);
    controls.forEach(key => {
      const control = this.habitacion.get(key);
      if(control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarHabitacion() {
    if(this.habitacion.valid) {
      this.apiRestService.doPost(this.urlHabitaciones, this.habitacion.value).subscribe((response: any) => {
        if(response._id) {
          this.resetearForm()
          this.obtenerHabitaciones()
          Swal.fire("OK", "Habitacion creada correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
        Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarHabitacion(idHabitacion: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta habitacion?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const path = `${this.urlHabitaciones}/${idHabitacion}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if(response.message) {
            this.obtenerHabitaciones()
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
