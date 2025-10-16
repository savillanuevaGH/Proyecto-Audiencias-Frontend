import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// Define una interfaz para la estructura de la notificación
export interface Notification {
  message: string;
  type: 'success' | 'warning' | 'error';
  duration?: number; // Opcional: para el tiempo que estará visible
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Subject para emitir el evento de notificación
  private notificationSubject = new Subject<Notification>();

  // Observable público para que el componente se suscriba
  notification$ = this.notificationSubject.asObservable();

  constructor() { }

  /**
   * Método para mostrar una notificación
   * @param message El mensaje a mostrar
   * @param type El tipo de notificación ('success' | 'warning' | 'error')
   */
  show(message: string, type: 'success' | 'warning' | 'error', duration: number = 3000): void {
    this.notificationSubject.next({ message, type, duration });
  }

  // Métodos de conveniencia
  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }
}
