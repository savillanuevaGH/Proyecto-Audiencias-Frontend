import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { NotificationService } from "./shared/services/notification.service";
import { PopupNotificationComponent } from "./shared/components/popup-notification/popup-notification.component";
import { LogInModalComponent } from "./features/auth/components/log-in-modal/log-in-modal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, PopupNotificationComponent, LogInModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Audiencias';

  // Servicio que maneja las notificaciones
  constructor(private notificationService: NotificationService) {}
}
