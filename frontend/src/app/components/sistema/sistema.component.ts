import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent {
  constructor(
    private router: Router,
    private storageService: StorageService
  ){}
  salir() {
    this.storageService.cleanStorage()
    this.router.navigate(["acceso"])
  }
}
