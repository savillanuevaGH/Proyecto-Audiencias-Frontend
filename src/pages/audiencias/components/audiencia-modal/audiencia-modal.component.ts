import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app/material/material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-audiencia-modal',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './audiencia-modal.component.html',
  styleUrl: './audiencia-modal.component.css'
})
export class AudienciaModalComponent implements OnInit {
  formType!: 'create' | 'edit' | 'delete';

  newAudienciaForm!: FormGroup;
  editAudienciaForm!: FormGroup;
  deleteAudienciaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AudienciaModalComponent>
  ) { }

  ngOnInit(): void {
    this.newAudienciaForm = this.fb.group({
      cuij: ['', Validators.required],
      caratula: ['', Validators.required],
      fecha: ['', Validators.required],
      duracion: ['', Validators.required],
      sala: ['', Validators.required],
      autoridades: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.editAudienciaForm = this.fb.group({
      // Definición de controles para editar audiencia
    });

    this.deleteAudienciaForm = this.fb.group({
      // Definición de controles para eliminar audiencia
    });
  }

  onCreate(): void {
    if (this.newAudienciaForm.valid) {
      // enviar a la API
    }
  }
}
