import { Component } from '@angular/core';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  datosSolicitud: any;

  constructor(private datosSolicitudService: SolicitudesService) {}

  ngOnInit() {
    // Obtener los datos de la solicitud desde el servicio compartido
    this.datosSolicitud = this.datosSolicitudService.obtenerDatosSolicitud();
  }
}
