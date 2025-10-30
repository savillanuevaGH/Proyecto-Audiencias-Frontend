import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MaterialModule } from '../../app/material/material/material.module';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AudienciaModalComponent } from './components/audiencia-modal/audiencia-modal.component';

import { Audiencia } from '../../app/models/Audiencia';

// Datos de prueba
const AUDIENCIAS: Audiencia[] = []

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

  constructor(
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(AUDIENCIAS);
    this.dataSource.filterPredicate = this.createFilterPredicate();
  }

  openCreateModal(): void {
    this.dialog.open(AudienciaModalComponent, {
      width: '720px',
      height: '574px',
      disableClose: false,
      data: { formType: 'create' }
    });
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
