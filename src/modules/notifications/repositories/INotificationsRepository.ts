import { CreateNotificationDTO } from '../dtos/CreateNotificationDTO';
import { Notification } from '../infra/typeorm/schemas/Notification';

export interface INotificationsRepository {
  create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification>;
}
