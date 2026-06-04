import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AuthSession } from './types/auth-session.type';
import { AuthSessionsEntity } from './auth-sessions.entity';

@Injectable()
export class AuthSessionsRepository {
  constructor(
    @InjectRepository(AuthSessionsEntity)
    private readonly repository: Repository<AuthSessionsEntity>,
  ) {}

  async findOne(
    criteria: FindOptionsWhere<AuthSessionsEntity>,
  ): Promise<AuthSessionsEntity | null> {
    return this.repository.findOne({
      where: criteria,
    });
  }

  async create(newAuthSession: AuthSession): Promise<AuthSessionsEntity> {
    const newAuthSessionsEntity = this.repository.create(newAuthSession);
    return await this.repository.save(newAuthSessionsEntity);
  }

  async deleteOne(id: string): Promise<AuthSessionsEntity | null> {
    const foundSession = await this.findOne({ userId: id });
    if (!foundSession) {
      throw new NotFoundException(`Session with userId ${id} not found.`);
    }
    await this.repository.delete(foundSession.id);
    return foundSession;
  }

  async deleteAll(id: string): Promise<void> {
    await this.repository.delete({ userId: id });
  }

  // deleteExpired? delete all rows where the expiresAt column is expired
}
