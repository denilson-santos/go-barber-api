import { CreateNotificationDTO } from '../dtos/CreateNotificationDTO';
import { Notification } from '../infra/typeorm/schemas/Notification';

export interface INotificationRepository {
  create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification>;
}
