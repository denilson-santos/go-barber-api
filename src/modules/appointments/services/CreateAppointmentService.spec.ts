import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentRepository';

import AppError from '@shared/errors/AppErrors';

const makeSut = (): CreateAppointmentService => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();

  return new CreateAppointmentService(fakeAppointmentsRepository);
};

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const createAppointment = makeSut();

    const appointment = await createAppointment.execute({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const createAppointment = makeSut();

    const appointmentDate = new Date(2021, 6, 18, 14);

    await createAppointment.execute({
      provider_id: '123456789',
      user_id: '987654321',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        provider_id: '123456789',
        user_id: '987654321',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
