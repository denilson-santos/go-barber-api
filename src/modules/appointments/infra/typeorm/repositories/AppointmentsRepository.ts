import { Between, getRepository, Repository } from 'typeorm';
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { CreateAppointmentDTO } from '@modules/appointments/dtos/CreateAppoinmentDTO';
import { FindAllByDayAppointmentDTO } from '@modules/appointments/dtos/FindAllByDayAppointmentDTO';
import { FindAllByMonthAppointmentDTO } from '@modules/appointments/dtos/FindAllByMonthAppointmentDTO';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllByMonth({
    provider_id,
    month,
    year,
  }: FindAllByMonthAppointmentDTO): Promise<Appointment[] | undefined> {
    const date = new Date(year, month - 1);

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfMonth(date), endOfMonth(date)),
      },
    });
  }

  public async findAllByDay({
    provider_id,
    day,
    month,
    year,
  }: FindAllByDayAppointmentDTO): Promise<Appointment[] | undefined> {
    const date = new Date(year, month - 1, day);

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfDay(date), endOfDay(date)),
      },
    });
  }
}

export default AppointmentsRepository;
