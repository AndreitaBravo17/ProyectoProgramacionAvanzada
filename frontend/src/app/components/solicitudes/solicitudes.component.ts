import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { urlApi } from 'src/app/constants';
import { ApiRestService } from 'src/app/services/api-rest.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { REGEX_FORM } from 'src/app/utils/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  urlRegistro: string = `${urlApi}/registro`
  registros: any = []
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
    ])
  })
  constructor(private apiRestService: ApiRestService,
    private solicitudesService: SolicitudesService
  ) { }

  ngOnInit(): void {
    this.obtenerRegistro();
  }


  obtenerRegistro() {
    this.apiRestService.doGet(this.urlRegistro).subscribe(
      (response: any) => {
        this.registros = response
      })
  }


  eliminarRegistro(idRegistro: string) {
    Swal.fire({
      title: '¿Estás seguro de rechazar esta solicitud?',
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
            this.obtenerRegistro()
            Swal.fire("Eliminado", response.message, "success")
          } else {
            Swal.fire("Error", response.error, "error");
          }
        })
      }
    });
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
      }
    })
    this.registroSeleccionado = idRegistro
    this.modificarActivo = true
  }

  aceptarSolicitud(solicitud: any) {
    this.solicitudesService.guardarDatosSolicitud(solicitud);
  }
}
