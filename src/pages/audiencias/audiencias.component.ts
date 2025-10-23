import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../app/material/material/material.module';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// Definición de la interfaz Audiencia, luego crear el modelo.
export interface Audiencia {
  id: number;
  cuij: number;
  caratula: string;
  fecha: string;
  hora: string;
  tipo: string;
  estado: 'En Proceso' | 'Finalizada' | 'Por Comenzar';
  autoridad: string;
  sala: string;
}

// Datos de prueba
const AUDIENCIAS: Audiencia[] = [
  {id: 1, cuij: 1234567890, caratula: 'Caso A vs B', fecha: '2024-07-01', hora: '10:00', tipo: 'Oral', estado: 'Por Comenzar', autoridad: 'Juez Perez', sala: 'Sala 1'},
  {id: 2, cuij: 2345678901, caratula: 'Caso C vs D', fecha: '2024-07-02', hora: '11:00', tipo: 'Escrita', estado: 'Finalizada', autoridad: 'Juez Gomez', sala: 'Sala 2'},
  {id: 3, cuij: 3456789012, caratula: 'Caso E vs F', fecha: '2024-07-03', hora: '12:00', tipo: 'Oral', estado: 'En Proceso', autoridad: 'Juez Lopez', sala: 'Sala 3'},
  {id: 4, cuij: 4567890123, caratula: 'Caso G vs H', fecha: '2024-07-04', hora: '13:00', tipo: 'Escrita', estado: 'Finalizada', autoridad: 'Juez Martinez', sala: 'Sala 4'},
]

@Component({
  selector: 'app-audiencias',
  imports: [MaterialModule, FormsModule],
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
      let dataFecha = new Date(data.fecha);
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
        (searchTerms.sala === '' || data.sala.toLowerCase() === searchTerms.sala.toLowerCase()) &&
        // Coincidencia de Autoridad
        (searchTerms.autoridad === '' || data.autoridad.toLowerCase() === searchTerms.autoridad.toLowerCase()) &&
        // Coincidencia de Tipo
        (searchTerms.tipo === '' || data.tipo.toLowerCase() === searchTerms.tipo.toLowerCase()) &&
        // Coincidencia de Fecha
        fechaMatch
      );
    };
  }
}
