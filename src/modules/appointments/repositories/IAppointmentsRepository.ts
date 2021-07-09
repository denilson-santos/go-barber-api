import Appointment from '../infra/typeorm/entities/Appointment';
import { ICreateAppointmentDTO } from '../dtos/ICreateAppoinmentDTO';

export interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
