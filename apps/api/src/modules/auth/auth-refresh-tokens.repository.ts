import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { RefreshTokensRow } from './types/auth-refresh-tokens-row.type';
import { RefreshTokensEntity } from './auth-refresh-tokens.entity';

@Injectable()
export class RefreshTokensRepository {
  constructor(
    @InjectRepository(RefreshTokensEntity)
    private readonly repository: Repository<RefreshTokensEntity>,
  ) {}

  async findOne(
    criteria: FindOptionsWhere<RefreshTokensEntity>,
  ): Promise<RefreshTokensEntity | null> {
    return this.repository.findOne({
      where: criteria,
    });
  }

  async create(
    newRefreshTokenRow: RefreshTokensRow,
  ): Promise<RefreshTokensEntity> {
    const newRefreshTokensEntity = this.repository.create(newRefreshTokenRow);
    return await this.repository.save(newRefreshTokensEntity);
  }

  // delete one record by id
  async deleteOne(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Session with id ${id} not found.`);
    }
  }

  // // delete all records with matching userId from refresh_tokens table
  // async deleteAll(userId: string): Promise<void> {
  //   await this.repository.delete({ userId });
  // }

  // deleteExpired? delete all rows where the expiresAt column is expired
}
