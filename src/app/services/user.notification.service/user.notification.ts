import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  success(message: string, description: string): void {
    this.notification.success(message, description, { nzDuration: 3000 });
  }

  error(message: string, description: string): void {
    this.notification.error(message, description, { nzDuration: 3000 });
  }

  info(message: string, description: string): void {
    this.notification.info(message, description, { nzDuration: 3000 });
  }

  warning(message: string, description: string): void {
    this.notification.warning(message, description, { nzDuration: 3000 });
  }
}
