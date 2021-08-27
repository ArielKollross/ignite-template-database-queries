import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    return this.repository.findOne({ id: user_id})
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = `SELECT * FROM users ORDER BY first_name ASC`

    return this.repository.query(query);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = `SELECT * FROM users
      WHERE LOWER(first_name) = ${first_name.toLowerCase()} AND
      LOWER(last_name) = ${last_name.toLowerCase()}`

    return this.repository.query(query);
  }
}
