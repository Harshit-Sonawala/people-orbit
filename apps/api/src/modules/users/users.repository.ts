import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { UsersEntity } from './users.entity';
import { dummyData } from './users.dummyData.static';
import { User, UserStats } from './types';

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

  async deleteOne(id: string): Promise<UsersEntity | null> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} no found.`);
    }
    await this.repository.delete(id);
    return user;
  }

  async seed() {
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

  // Dashboard statistics - cards and charts
  async getStats(): Promise<UserStats> {
    const newMembersRange = Date.now() - 365 * 24 * 60 * 60 * 1000; // 1 Year ago in milliseconds

    // Key Statistics Cards Queries:
    const [totalUsers] = await this.repository.query(`
      SELECT
        COUNT(*) AS "totalUsers",
        COUNT(DISTINCT designation) AS "uniqueDesignations"
      FROM
        users
    `);

    const [newMembers] = await this.repository.query(
      `
      SELECT COUNT(*) AS "newMembers"
      FROM users
      WHERE "createdAt" > $1
    `,
      [newMembersRange],
    );

    const [uniqueSkills] = await this.repository.query(`
      SELECT COUNT(DISTINCT skill) AS "uniqueSkills"
      FROM users, unnest(skills) AS skill
      WHERE skills IS NOT NULL AND array_length(skills, 1) > 0
    `);

    const [avgAge] = await this.repository.query(`
      SELECT ROUND(AVG(age)) AS "avgAge"
      FROM users
    `);

    const topDesignations = await this.repository.query(`
      SELECT designation AS "topDesignation", COUNT(*) AS count
      FROM users
      GROUP BY designation
      ORDER BY count DESC
      LIMIT 3
    `);

    const topSkills = await this.repository.query(`
      SELECT skill AS "topSkill", COUNT(*) AS count
      FROM users, unnest(skills) AS skill
      WHERE skills IS NOT NULL AND array_length(skills, 1) > 0
      GROUP BY skill
      ORDER BY count DESC
      LIMIT 3
    `);

    const [newestUserName] = await this.repository.query(`
      SELECT "firstName", "lastName"
      FROM users
      ORDER BY "createdAt" DESC
      LIMIT 1
    `);

    // Charts Queries:
    // All skills, counts grouped by skill, ordered by count descending (most popular to least popular)
    const skillsFreq = await this.repository.query(`
      SELECT skill, COUNT(*) AS count
      FROM users, unnest(skills) AS skill
      WHERE skills IS NOT NULL AND array_length(skills, 1) > 0
      GROUP BY skill
      ORDER BY count DESC
    `);

    // All designations, counts grouped by designation of each group
    const designationsFreq = await this.repository.query(`
      SELECT designation, COUNT(*) AS count
      FROM users
      GROUP BY designation
    `);

    // All createdAt, counts grouped by createdAt, ordered by createdAt of each group
    const createdAtFreq = await this.repository.query(`
      SELECT DATE_TRUNC('day', TO_TIMESTAMP("createdAt" / 1000.0)) AS "createdAt", COUNT(*) AS count
      FROM users
      GROUP BY "createdAt"
      ORDER BY "createdAt"
    `);

    // Ages and counts of all distinct ages
    const ageFreq = await this.repository.query(`
      SELECT age, COUNT(*) AS count
      FROM users
      GROUP BY age
    `);

    return {
      totalUsers: parseInt(totalUsers.totalUsers),
      newUsersCount: parseInt(newMembers.newMembers),
      avgAge: parseInt(avgAge.avgAge),
      uniqueDesignations: parseInt(totalUsers.uniqueDesignations),
      uniqueSkills: parseInt(uniqueSkills.uniqueSkills),
      topDesignations: topDesignations.map(
        (d: { topDesignation: string }) => d.topDesignation,
      ),
      topSkills: topSkills.map((s: { topSkill: string }) => s.topSkill),
      newestUserName: newestUserName
        ? `${newestUserName.firstName} ${newestUserName.lastName}`
        : '-',

      skillsFreq: skillsFreq,
      designationsFreq: designationsFreq,
      createdAtFreq: createdAtFreq,
      ageFreq: ageFreq,
    };
  }
}
