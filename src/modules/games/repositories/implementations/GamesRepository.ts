import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('games')
      .where(`LOWER(title) ILIKE ${param.toLowerCase()}`).getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const query = `SELECT COUNT (id) FROM games`

    return this.repository.query(query); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      // Complete usando query builder
  }
}
