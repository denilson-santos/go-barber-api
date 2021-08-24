import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';

import { FindAllByDayAppointmentDTO } from '../dtos/FindAllByDayAppointmentDTO';

import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

type Response = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: FindAllByDayAppointmentDTO): Promise<Response> {
    const appointmentsInDay = await this.appointmentsRepository.findAllByDay({
      provider_id,
      year,
      month,
      day,
    });

    const hourStart = 8;

    const hourEnd = 17;

    const availability: Response = [];

    for (let index = hourStart; index <= hourEnd; index += 1) {
      const hasAppointmentInHour = appointmentsInDay?.find(
        (appointment) => getHours(appointment.date) === index
      );

      availability.push({
        hour: index,
        available: !hasAppointmentInHour,
      });
    }

    return availability;
  }
}
