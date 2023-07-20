import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';



@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.scss']
})
export class InscritosComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  displayedColumns: string[] = ['position', 'nombre', 'apellido', 'cedula', 'correo', 'edad','curso','ciudad','genero', 'acciones'];
  dataSource = new MatTableDataSource<any>(this.listUsuarios);

  constructor() {

  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.obtenerUsuario();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggle = true;
  status = 'Aprobado';

  toggle1 = true;
  status1 = 'Aprobado';

  toggle2 = true;
  status2 = 'Aprobado';

  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Aprobado' : 'Pendiente';
  }

  enableDisableRule1() {
    this.toggle1 = !this.toggle1;
    this.status1 = this.toggle1 ? 'Aprobado' : 'Pendiente';
  }

  enableDisableRule2() {
    this.toggle2 = !this.toggle2;
    this.status2 = this.toggle2 ? 'Aprobado' : 'Pendiente';
  }

  cargarUsuarios() {
    // this.listUsuarios = this._usuarioService.getUsuarios();
    // this.dataSource = new MatTableDataSource<any>(this.listUsuarios);
  }

  obtenerUsuario() {
  }


}


