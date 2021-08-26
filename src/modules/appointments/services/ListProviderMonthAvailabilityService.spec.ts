import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentRepository';
import { ListProviderMonthAvailabilityService } from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService =
      new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list month availability', async () => {
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

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 15),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 16),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 22, 17),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '#123456',
      user_id: '987654321',
      date: new Date(2021, 7, 23, 17),
    });

    expect(
      await listProviderMonthAvailabilityService.execute({
        provider_id: '#123456',
        month: 8,
        year: 2021,
      })
    ).toEqual(
      expect.arrayContaining([
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 22, available: false },
        { day: 23, available: true },
      ])
    );
  });
});
