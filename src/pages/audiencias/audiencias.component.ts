import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MaterialModule } from '../../app/material/material/material.module';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Audiencia } from '../../app/models/Audiencia';

// Datos de prueba
const AUDIENCIAS: Audiencia[] = [
  {
    id: 1,
    nombre: 'Audiencia 1',
    estado: 'Programada',
    tipo: 'Oral',
    cuij: '20-12345678-9',
    horaInicio: '10:00 AM',
    duracion: 60,
    fechaCreacion: new Date('2024-01-01'),
    fechaInscripcion: new Date('2024-01-10'),
    creadoPorUsuario: 1,
    modificadoPorUsuario: 2,
    sala: 1
  },
  {
    id: 2,
    nombre: 'Audiencia 2',
    estado: 'Finalizada',
    tipo: 'Escrita',
    cuij: '27-87654321-0',
    horaInicio: '02:00 PM',
    duracion: 90,
    fechaCreacion: new Date('2024-02-01'),
    fechaInscripcion: new Date('2024-02-15'),
    creadoPorUsuario: 2,
    modificadoPorUsuario: 3,
    sala: 2
  },
  {
    id: 3,
    nombre: 'Audiencia 3',
    estado: 'En Proceso',
    tipo: 'Escrita',
    cuij: '20-98765432-1',
    horaInicio: '11:30 AM',
    duracion: 45,
    fechaCreacion: new Date('2024-03-01'),
    fechaInscripcion: new Date('2024-03-12'),
    creadoPorUsuario: 1,
    modificadoPorUsuario: 1,
    sala: 1
  }
]

@Component({
  selector: 'app-audiencias',  imports: [MaterialModule, FormsModule, DatePipe],
  templateUrl: './audiencias.component.html',
  styleUrl: './audiencias.component.css'
})
export class AudienciasComponent implements AfterViewInit {
  displayedColumns: string[] = ['cuij', 'caratula', 'fecha y hora', 'tipo', 'estado', 'autoridad', 'sala', 'acciones'];
  dataSource = new MatTableDataSource<Audiencia>(AUDIENCIAS);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValues = {
    sala: '',
    autoridad: '',
    fecha: null as Date | null,
    tipo: ''
  }

  constructor() {
    this.dataSource = new MatTableDataSource(AUDIENCIAS);
    this.dataSource.filterPredicate = this.createFilterPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify(this.filterValues);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createFilterPredicate(): (data: Audiencia, filter: string) => boolean {
    return (data: Audiencia, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      // Normalizar fechas para comparar solo día, mes y año (ignorar hora)
      let dataFecha = new Date(data.horaInicio);
      let filterFecha = searchTerms.fecha ? new Date(searchTerms.fecha) : null;

      const fechaMatch = !filterFecha ||
        (dataFecha.getFullYear() === filterFecha.getFullYear() &&
         dataFecha.getMonth() === filterFecha.getMonth() &&
         dataFecha.getDate() === filterFecha.getDate());

      // Lógica de coincidencia para cada campo
      // Devuelve 'true' si el campo de filtro está vacío (no filtra)
      // o si el dato de la fila coincide con el filtro.
      return (
        // Coincidencia de Sala
        (searchTerms.sala === '' || data.sala === searchTerms.sala) &&
        // Coincidencia de Autoridad
        // (searchTerms.autoridad === '' || data.autoridad.toLowerCase() === searchTerms.autoridad.toLowerCase()) &&
        // Coincidencia de Tipo
        (searchTerms.tipo === '' || data.tipo.toLowerCase() === searchTerms.tipo.toLowerCase()) &&
        // Coincidencia de Fecha
        fechaMatch
      );
    };
  }
}
