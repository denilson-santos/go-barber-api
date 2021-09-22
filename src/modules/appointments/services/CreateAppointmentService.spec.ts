import 'reflect-metadata';

import CreateAppointmentService from './CreateAppointmentService';
import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentRepository';

import AppError from '@shared/errors/AppErrors';
import { FakeNotificationsRepository } from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    );

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 7, 22).getTime());
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      provider_id: '123456789',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 9),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 7, 22, 14);

    await createAppointmentService.execute({
      provider_id: '123456789',
      user_id: '987654321',
      date: appointmentDate,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '123456789',
        user_id: '987654321',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    await expect(
      createAppointmentService.execute({
        provider_id: '123456789',
        user_id: '987654321',
        date: new Date(2021, 7, 21, 12),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able for a provider to schedule with itself', async () => {
    await expect(
      createAppointmentService.execute({
        provider_id: '123456789',
        user_id: '123456789',
        date: new Date(2021, 7, 22, 12),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a schedule before 8am and after 5pm with himself', async () => {
    await expect(
      createAppointmentService.execute({
        provider_id: '123456789',
        user_id: '987654321',
        date: new Date(2021, 7, 22, 7),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        provider_id: '123456789',
        user_id: '987654321',
        date: new Date(2021, 7, 22, 18),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
