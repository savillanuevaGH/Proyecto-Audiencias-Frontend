import { ModalService } from './../features/auth/services/modal.service';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { ModalState } from '../features/auth/services/modal.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(
    private modalService: ModalService,
    private notificationService: NotificationService
  ) { }

  openLoginModal(): void {
    this.modalService.open();

    this.modalService.loginModal$.pipe(
      filter((state: ModalState) => !state.isOpen), // Solo cuando el modal se cierra
      take(1) // Solo escucha el primer cierre
    ).subscribe(state => {
      // 4. Llama a la función que maneja el resultado del inicio de sesión
      this.handleLoginResult(state.data);
    });
  }

  private handleLoginResult(loginData: any): void {
    if (loginData && loginData.success) { // Asume que el modal devuelve { success: true }
      // Inicio de Sesión Correcto
      this.notificationService.success('Inicio de Sesión Exitoso');

      // Aquí se actualizaría el estado de usuario, se redirigiría, etc.

    } else if (loginData) { // El modal se cerró con datos, pero la lógica falló (ej: credenciales incorrectas)
      // Error de Credenciales
      this.notificationService.error('No se ha podido iniciar sesión. Credenciales incorrectas.');

    } else {
      // El usuario simplemente cerró el modal (data es null)
      this.notificationService.warning('Inicio de sesión cancelado.');
    }
  }
}
