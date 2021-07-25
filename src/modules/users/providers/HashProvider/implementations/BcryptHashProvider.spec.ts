import bcrypt from 'bcryptjs';

import { IHashProvider } from '../models/IHashProvider';

import { BcryptHashProvider } from './BcryptHashProvider';

jest.mock('bcryptjs', () => ({
  async hash() {
    return 'hash';
  },
  hashSync() {
    return 'hash';
  },
  async compare() {
    return true;
  },
  compareSync() {
    return true;
  },
}));

const makeSut = (): IHashProvider => new BcryptHashProvider();

const SALT_LENGTH = 8;

describe('BcryptHashProvider', () => {
  it('should be able to generate hash valid', async () => {
    const bcryptHashProvider = makeSut();

    const spyHash = jest.spyOn(bcrypt, 'hash');

    const hash = await bcryptHashProvider.generateHash('hash', SALT_LENGTH);

    expect(spyHash).toHaveBeenCalledWith('hash', SALT_LENGTH);
    expect(hash).toBe('hash');
  });

  it('should be able to generate hash valid of sync form', () => {
    const bcryptHashProvider = makeSut();

    const spyHash = jest.spyOn(bcrypt, 'hashSync');

    const hash = bcryptHashProvider.generateHashSync('hash', SALT_LENGTH);

    expect(spyHash).toHaveBeenCalledWith('hash', SALT_LENGTH);
    expect(hash).toBe('hash');
  });

  it('should be able to compare hashs', async () => {
    const bcryptHashProvider = makeSut();

    expect(await bcryptHashProvider.compareHash('hash', 'hash')).toBe(true);
  });

  it('should be able to compare hashs of sync form', () => {
    const bcryptHashProvider = makeSut();

    expect(bcryptHashProvider.compareHashSync('hash', 'hash')).toBe(true);
  });
});
