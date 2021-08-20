import Appointment from '../infra/typeorm/entities/Appointment';
import { CreateAppointmentDTO } from '../dtos/CreateAppoinmentDTO';

export interface IAppointmentsRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
