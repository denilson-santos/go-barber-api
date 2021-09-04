import { FakeAppointmentsRepository } from '../repositories/fakes/FakeAppointmentRepository';
import { IAppointmentsRepository } from '../repositories/IAppointmentsRepository';
import { ListProviderAppointmentsService } from './ListProviderAppointmentsService';

let appointmentsRepository: IAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      appointmentsRepository
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await appointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2021, 8, 3, 8),
    });

    const appointment2 = await appointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2021, 8, 3, 9),
    });

    expect(
      await listProviderAppointmentsService.execute({
        provider_id: 'provider_id',
        year: 2021,
        month: 9,
        day: 3,
      })
    ).toEqual([appointment1, appointment2]);
  });
});
