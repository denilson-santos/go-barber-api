import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

import { FindAllByDayAppointmentDTO } from '../dtos/FindAllByDayAppointmentDTO';

import { ICacheProvider } from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: FindAllByDayAppointmentDTO): Promise<Appointment[] | undefined> {
    const cacheKey = `provider-appointments-list:${provider_id}:${year}-${month}-${day}`;

    let appointmentsByDay = await this.cacheProvider.recover<
      Appointment[] | undefined
    >(cacheKey);

    if (!appointmentsByDay) {
      appointmentsByDay = await this.appointmentsRepository.findAllByDay({
        provider_id,
        year,
        month,
        day,
      });

      await this.cacheProvider.save<Appointment[] | undefined>(
        cacheKey,
        appointmentsByDay
      );
    }

    return appointmentsByDay;
  }
}
