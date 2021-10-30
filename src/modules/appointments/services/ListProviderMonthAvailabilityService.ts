import { getDate, getDaysInMonth, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import { FindAllByMonthAppointmentDTO } from '../dtos/FindAllByMonthAppointmentDTO';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';

type Response = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: FindAllByMonthAppointmentDTO): Promise<Response> {
    const appointmentsInMonth =
      await this.appointmentsRepository.findAllByMonth({
        provider_id,
        month,
        year,
      });

    const date = new Date(year, month - 1);

    const availability: Response = [];

    for (let index = 1; index <= getDaysInMonth(date); index += 1) {
      const lastDateOfDay = new Date(year, month - 1, index, 23, 59, 59);

      let appointmentsInDay: Appointment[] = [];

      if (appointmentsInMonth) {
        appointmentsInDay = appointmentsInMonth.filter(
          (appointment) => getDate(appointment.date) === index
        );
      }

      availability[index - 1] = {
        day: index,
        available:
          isAfter(lastDateOfDay, new Date()) && appointmentsInDay.length < 10,
      };
    }

    return availability;
  }
}
