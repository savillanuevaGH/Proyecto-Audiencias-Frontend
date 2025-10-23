import { NgModule } from '@angular/core';

// Módulos de Material que vas a usar
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    // La lista de módulos se repite aquí
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    // Y es crucial exportarlos para que estén disponibles
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class MaterialModule { }
