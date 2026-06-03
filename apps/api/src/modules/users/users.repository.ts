import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { UsersEntity } from './users.entity';
import { dummyData } from './users.dummyData.static';
import { User } from './types/user.type';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly repository: Repository<UsersEntity>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: string,
  ): Promise<[UsersEntity[], number]> {
    return await this.repository.findAndCount({
      order: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(
    criteria: FindOptionsWhere<UsersEntity>,
  ): Promise<UsersEntity | null> {
    return this.repository.findOne({
      where: criteria,
      relationLoadStrategy: 'query', // returns all array types too
    });
  }

  async findOneAndGetPassword(email: string): Promise<UsersEntity | null> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async createOrReplace(newUser: User): Promise<UsersEntity> {
    const newUsersEntity = this.repository.create(newUser);
    return await this.repository.save(newUsersEntity);
  }

  async update(
    id: string,
    partialUpdatedUser: Partial<User>,
  ): Promise<UsersEntity | null> {
    await this.repository.update(id, partialUpdatedUser);
    return await this.findOne({ id });
  }

  async delete(id: string): Promise<UsersEntity | null> {
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
  ): Promise<[UsersEntity[], number]> {
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
