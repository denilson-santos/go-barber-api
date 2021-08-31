import { getHours, isAfter } from 'date-fns';

import { inject, injectable } from 'tsyringe';

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

    const currentDate = new Date(Date.now());

    for (let index = hourStart; index <= hourEnd; index += 1) {
      const appointmentInHour = appointmentsInDay?.find(
        (appointment) => getHours(appointment.date) === index
      );

      const date = new Date(year, month - 1, day, index);

      availability.push({
        hour: index,
        available: isAfter(date, currentDate) && !appointmentInHour,
      });
    }

    return availability;
  }
}
