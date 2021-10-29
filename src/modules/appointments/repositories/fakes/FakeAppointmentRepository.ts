import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { v4 as uuid } from 'uuid';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { CreateAppointmentDTO } from '@modules/appointments/dtos/CreateAppoinmentDTO';
import { FindAllByDayAppointmentDTO } from '@modules/appointments/dtos/FindAllByDayAppointmentDTO';
import { FindAllByMonthAppointmentDTO } from '@modules/appointments/dtos/FindAllByMonthAppointmentDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';

export class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    user_id,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), user_id, provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(
    date: Date,
    provider_id: string
  ): Promise<Appointment | undefined> {
    return this.appointments.find(
      (appointment) =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id
    );
  }

  public async findAllByMonth({
    provider_id,
    month,
    year,
  }: FindAllByMonthAppointmentDTO): Promise<Appointment[] | undefined> {
    return this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );
  }

  public async findAllByDay({
    provider_id,
    month,
    year,
    day,
  }: FindAllByDayAppointmentDTO): Promise<Appointment[] | undefined> {
    return this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );
  }
}
