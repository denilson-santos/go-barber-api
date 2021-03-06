import { ObjectId } from 'mongodb';

import { INotificationsRepository } from '../INotificationsRepository';

import { CreateNotificationDTO } from '@modules/notifications/dtos/CreateNotificationDTO';
import { Notification } from '@modules/notifications/infra/typeorm/schemas/Notification';

export class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectId(), recipient_id, content });

    this.notifications.push(notification);

    return notification;
  }
}
