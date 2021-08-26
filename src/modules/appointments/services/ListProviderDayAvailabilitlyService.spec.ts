import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentRepository';
import { ListProviderDayAvailabilityService } from './ListProviderDayAvailabilitlyService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to list provider day availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 8),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 9),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 10),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 11),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 12),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 13),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 14),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 7, 22, 12).getTime());

    expect(
      await listProviderDayAvailabilityService.execute({
        provider_id: '#123456',
        year: 2021,
        month: 8,
        day: 22,
      })
    ).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ])
    );
  });
});
