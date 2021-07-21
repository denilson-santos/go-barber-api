import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentRepository';

import AppError from '@shared/errors/AppErrors';

describe('CreateAppointment', () => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();

  const createAppointment = new CreateAppointmentService(
    fakeAppointmentsRepository
  );

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 6, 18, 14);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456789',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
