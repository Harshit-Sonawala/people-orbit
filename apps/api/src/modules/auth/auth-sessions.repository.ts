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

  async findAllByUserId(userId: string): Promise<AuthSessionsEntity[]> {
    return this.repository.find({ where: { userId } });
  }

  async create(newAuthSession: AuthSession): Promise<AuthSessionsEntity> {
    const newAuthSessionsEntity = this.repository.create(newAuthSession);
    return await this.repository.save(newAuthSessionsEntity);
  }

  // delete one record by sessionId
  async deleteOne(sessionId: string): Promise<void> {
    const result = await this.repository.delete(sessionId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Session with sessionId ${sessionId} not found.`,
      );
    }
  }

  // delete all records with matching userId from auth_sessions table
  async deleteAll(userId: string): Promise<void> {
    await this.repository.delete({ userId: userId });
  }

  // deleteExpired? delete all rows where the expiresAt column is expired
}
