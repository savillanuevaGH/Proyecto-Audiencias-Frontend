import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService, ModalState } from '../../services/modal.service';

@Component({
  selector: 'app-log-in-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-in-modal.component.html',
  styleUrl: './log-in-modal.component.css'
})
export class LogInModalComponent {
  isOpen = false;
  private subscription!: Subscription;

  constructor(private modalService: ModalService,) { }

  ngOnInit(): void {
    // Suscribirse al estado del modal
    this.subscription = this.modalService.loginModal$.subscribe(
      (state: ModalState) => {
        this.isOpen = state.isOpen;
      }
    );
  }

  onLoginSubmit(): void {
    // Simulación: aquí llamarías a tu AuthService, que devolvería el resultado.
    const authSuccess = Math.random() > 0.3; // 70% de éxito para la prueba
    
    if (authSuccess) {
      // Si la autenticación es exitosa, cierra y devuelve el indicador de éxito
      this.modalService.close({ success: true });
    } else {
      // Si la autenticación falla (ej: credenciales inválidas), cierra y devuelve error.
      this.modalService.close({ success: false, error: 'invalid_credentials' });
    }
  }

  onClose(): void {
    // Cuando el usuario presiona Cancelar o el botón de cerrar, no se devuelve nada (null)
    this.modalService.close(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
