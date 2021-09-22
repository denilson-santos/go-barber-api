import { getMongoRepository, MongoRepository } from 'typeorm';

import { Notification } from '../schemas/Notification';

import { CreateNotificationDTO } from '@modules/notifications/dtos/CreateNotificationDTO';
import { INotificationRepository } from '@modules/notifications/repositories/INotificationRepository';

export class NotificationsRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
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
