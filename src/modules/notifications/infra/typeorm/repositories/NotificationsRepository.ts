import { getMongoRepository, MongoRepository } from 'typeorm';

import { Notification } from '../schemas/Notification';

import { CreateNotificationDTO } from '@modules/notifications/dtos/CreateNotificationDTO';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';

export class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongodb');
  }

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}
