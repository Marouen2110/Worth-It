import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationsRoutingModule } from '../notifications/notifications-routing.module';

@NgModule({
  declarations: [NotificationListComponent],
  imports: [CommonModule, NotificationsRoutingModule, SharedModule],
  exports: [NotificationListComponent],
})
export class NotificationsModule {}
