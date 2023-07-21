import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recien-nacidos',
  templateUrl: './recien-nacidos.component.html',
  styleUrls: ['./recien-nacidos.component.css']
})
export class RecienNacidosComponent {
  urlNacimientos:       string = `${urlApi}/nacimientos`
  tiposNacimiento: any = []
  nacimientos:    any = []
  generos: any = [
    {
      id: 1,
      name: "Masculino"
    },
    {
      id: 2,
      name: "Femenino"
    }
  ]
  enfermedades:  any = [
    {
      id: 1,
      name: "SI"
    },
    {
      id: 2,
      name: "NO"
    }
  ]
  modificarActivo = false
  nacimientoSeleccionada = ""
  nacimiento: FormGroup = new FormGroup({
    nombre:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isValidNAME)
    ]),
    fecha:  new FormControl('', [
      Validators.required,
    ]),
    peso:  new FormControl('', [
      Validators.required,
      Validators.pattern(REGEX_FORM.isWeightValid)
    ]),
    genero:  new FormControl('', [
      Validators.required
    ]),
    enfermedades:  new FormControl('', [
      Validators.required
    ])
  })

  constructor(
    private apiRestService: ApiRestService
  ) {}

  ngOnInit(): void {
    this.obtenerNacimientos()
  }

  obtenerNacimientos() {
    this.apiRestService.doGet(this.urlNacimientos).subscribe((response: any) => {
      this.nacimientos = response
      this.nacimientos.map((nacimiento:any) => {
        const genero = this.generos.find((g: any) => {
          return nacimiento.genero === g.id
        })

        const enfermedad = this.enfermedades.find((e: any) => {
          return nacimiento.enfermedades === e.id
        })
        nacimiento.genero = genero.name
        nacimiento.enfermedades = enfermedad.name
        return nacimiento
      })
    })
  }

  mensajeError(input: string) {
    const campo = this.nacimiento.get(input);
    const fueTocado = campo?.touched;
    const esValido = campo?.valid;
    if(campo?.value === "" && fueTocado) return false
    if(campo?.value === "") return true
    if(campo?.value !== "" && esValido) return true
    return false
  }

  activarModificar(idNacimiento:string) {
    const path = `${this.urlNacimientos}/${idNacimiento}`
    this.apiRestService.doGet(path).subscribe((response: any) => {
      if(response) {
        this.nacimiento.get("nombre")?.setValue(response.nombre)
        this.nacimiento.get("fecha")?.setValue(response.fecha)
        this.nacimiento.get("peso")?.setValue(response.peso)
        this.nacimiento.get("genero")?.setValue(response.genero)
        this.nacimiento.get("enfermedades")?.setValue(response.enfermedades)
      }
    })
    this.nacimientoSeleccionada = idNacimiento
    this.modificarActivo = true
  }

  actualizarNacimiento() {
    if(this.nacimiento.valid) {
      const path = `${this.urlNacimientos}/${this.nacimientoSeleccionada}`
      this.apiRestService.doPut(path, this.nacimiento.value).subscribe((response: any) => {
        this.resetearForm()
        this.obtenerNacimientos()
        if(response._id || response.message) {
          Swal.fire("OK", "Nacimiento actualizado correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
      Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  resetearForm() {
    const controls = Object.keys(this.nacimiento.controls);
    controls.forEach(key => {
      const control = this.nacimiento.get(key);
      if(control) {
        control.setValue("")
        control.markAsUntouched();
        control.markAsPristine();
        control.updateValueAndValidity();
      }
    });
    this.modificarActivo = false
  }

  guardarNacimiento() {
    if(this.nacimiento.valid) {
      this.apiRestService.doPost(this.urlNacimientos, this.nacimiento.value).subscribe((response: any) => {
        if(response._id || response.message) {
          this.obtenerNacimientos()
          this.resetearForm()
          Swal.fire("OK", "Nacimiento creado correctamente", "success")
        } else {
          Swal.fire("Error", response.error, "error");
        }
      })
    } else {
        Swal.fire("Atención", "Debes completar el formulario", "warning")
    }
  }

  eliminarNacimiento(idNacimiento: string) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta nacimiento?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const path = `${this.urlNacimientos}/${idNacimiento}`
        this.apiRestService.doDelete(path).subscribe((response: any) => {
          if(response.message) {
            this.obtenerNacimientos()
            this.resetearForm()
            Swal.fire("Eliminado", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
  }
}
