import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthSessionsEntity } from './';

@Injectable()
export class AuthSessionsRepository {
  constructor(
    @InjectRepository(AuthSessionsEntity)
    private readonly repository: Repository<AuthSessionsEntity>,
  ) {}
}
