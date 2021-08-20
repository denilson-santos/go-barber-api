import { isEqual } from 'date-fns';
import { v4 as uuid } from 'uuid';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { CreateAppointmentDTO } from '@modules/appointments/dtos/CreateAppoinmentDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';

export class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );
  }
}
