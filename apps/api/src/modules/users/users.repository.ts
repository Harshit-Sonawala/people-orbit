import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { UserEntity } from '@/entities';
import { dummyData } from './users.dummyData.static';
import { User } from './types';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: string,
  ): Promise<[UserEntity[], number]> {
    return await this.repository.findAndCount({
      order: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(
    criteria: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: criteria,
      relationLoadStrategy: 'query', // returns all array types too
    });
  }

  // async findOneById(id: string): Promise<UserEntity | null> {
  //   return this.repository.findOneBy({ id });
  // }

  // async findOneByEmail(email: string): Promise<UserEntity | null> {
  //   return this.repository.findOneBy({ email });
  // }

  async createOrReplace(newUser: User): Promise<UserEntity> {
    const newUserEntity = this.repository.create(newUser);
    return await this.repository.save(newUserEntity);
  }

  async update(
    id: string,
    partialUpdatedUser: Partial<User>,
  ): Promise<UserEntity | null> {
    await this.repository.update(id, partialUpdatedUser);
    return await this.findOne({ id });
  }

  async delete(id: string): Promise<UserEntity | null> {
    const user = await this.findOne({ id });
    if (user) {
      await this.repository.delete(id);
    }
    return user;
  }

  async seed() {
    const count = await this.repository.count();
    console.log('Seeding dummy data into Postgres...');
    await this.repository.save(dummyData);
    console.log(`Successfully seeded ${dummyData.length} users.`);
  }

  async search(
    query: string,
    page: number,
    limit: number,
  ): Promise<[UserEntity[], number]> {
    return await this.repository.findAndCount({
      where: [
        { firstName: ILike(`%${query}%`) },
        { lastName: ILike(`%${query}%`) },
        { designation: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
        { phone: ILike(`%${query}%`) },
      ],
      order: {
        firstName: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
