import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material/material.module';
import { NotificationService, Notification } from '../../services/notification.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-popup-notification',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './popup-notification.component.html',
  styleUrl: './popup-notification.component.css'
})
export class PopupNotificationComponent implements OnInit, OnDestroy {
  currentNotification: Notification | null = null;
  private subscription!: Subscription;
  private timerSubscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.notification$.subscribe(
      (notification: Notification) => {
        this.currentNotification = notification;
        this.startHideTimer(notification.duration || 2500);
      }
    );
  }

  startHideTimer(duration: number): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(duration).subscribe(() => {
      this.hide();
    });
  }

  hide(): void {
    this.currentNotification = null;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.hide();
  }
}
