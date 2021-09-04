import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import { FindAllByDayAppointmentDTO } from '../dtos/FindAllByDayAppointmentDTO';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

@injectable()
export class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: FindAllByDayAppointmentDTO): Promise<Appointment[] | undefined> {
    const appointmentsByDay = await this.appointmentsRepository.findAllByDay({
      provider_id,
      year,
      month,
      day,
    });

    return appointmentsByDay;
  }
}
