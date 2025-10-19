import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material/material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './log-in-modal.component.html', 
  styleUrl: './log-in-modal.component.css'
})
export class LogInModalComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LogInModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Usa 'any' si no tienes una interfaz definida para los datos
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  onLoginSubmit(): void {
    // Simulación: aquí llamarías a tu AuthService, que devolvería el resultado.
    const authSuccess = Math.random() > 0.3; 
    
    if (authSuccess) {
      // Usamos dialogRef.close() para cerrar el diálogo y DEVOLVER un resultado.
      this.dialogRef.close({ success: true });
    } else {
      // Devolver error
      this.dialogRef.close({ success: false, error: 'invalid_credentials' });
    }
  }

  onClose(): void {
    // Usamos dialogRef.close() para cerrar el diálogo sin devolver datos.
    this.dialogRef.close(null); 
  }

  ngOnDestroy(): void {
    // Ya no necesitas unsubscribe si eliminaste la suscripción a modalService
  }
}