import Appointment from '../infra/typeorm/entities/Appointment';
import { CreateAppointmentDTO } from '../dtos/CreateAppoinmentDTO';
import { FindAllByDayAppointmentDTO } from '../dtos/FindAllByDayAppointmentDTO';
import { FindAllByMonthAppointmentDTO } from '../dtos/FindAllByMonthAppointmentDTO';

export interface IAppointmentsRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllByMonth({
    provider_id,
    month,
    year,
  }: FindAllByMonthAppointmentDTO): Promise<Appointment[] | undefined>;
  findAllByDay({
    provider_id,
    day,
    month,
    year,
  }: FindAllByDayAppointmentDTO): Promise<Appointment[] | undefined>;
}
