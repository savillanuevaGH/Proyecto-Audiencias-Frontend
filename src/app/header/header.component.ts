import { Component } from '@angular/core';
import { MaterialModule } from '../material/material/material.module';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LogInModalComponent } from './../features/auth/components/log-in-modal/log-in-modal.component';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  openLoginModal(): void {
    // 💥 ABRIR EL DIÁLOGO DIRECTAMENTE 💥
    this.dialog.open(LogInModalComponent, {
      width: '450px',
      disableClose: false
    }).afterClosed().subscribe(result => {
        // 'result' es lo devuelto por dialogRef.close(data)
        this.handleLoginResult(result);
    });
  }

  private handleLoginResult(loginData: any): void {
    // ... Tu lógica para manejar el resultado sigue igual ...
    if (loginData && loginData.success) { 
      this.notificationService.success('Inicio de Sesión Exitoso');
    } else if (loginData) { 
      this.notificationService.error('No se ha podido iniciar sesión. Credenciales incorrectas.');
    } else {
      this.notificationService.warning('Inicio de sesión cancelado.');
    }
  }
}