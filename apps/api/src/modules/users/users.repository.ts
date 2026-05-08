import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities";
import { dummyData } from "./users.dummyData.static";
import { PaginatedUsers } from "./types";
import { GetAllQueryOptionsDto, CreateUserDto, UpdateUserDto, SortBy, Order } from "./dto";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) { }

  async findAll(options: GetAllQueryOptionsDto): Promise<PaginatedUsers> {
    const { page = 1, limit = 20, sortBy = SortBy.CREATED, order = Order.ASC } = options;

    const sortFieldMap: Record<SortBy, string> = {
      [SortBy.CREATED]: 'createdOn',
      [SortBy.UPDATED]: 'updatedOn',
      [SortBy.FIRST_NAME]: 'firstName',
      [SortBy.LAST_NAME]: 'lastName',
    };
    const orderMap: Record<Order, string> = {
      [Order.ASC]: 'ASC',
      [Order.DESC]: 'DESC',
    }

    const [data, total] = await this.repository.findAndCount({
      order: {
        [sortFieldMap[sortBy]]: orderMap[order]
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(createData: CreateUserDto): Promise<UserEntity> {
    const newDate = new Date();
    const idSlug = `${createData.firstName.toLowerCase().replace(/\s+/g, '-')}-${createData.lastName.toLowerCase().replace(/\s+/g, '-')}-${newDate.getTime()}`;

    const user = this.repository.create({
      ...createData,
      id: idSlug,
      createdOn: newDate,
      updatedOn: newDate,
    });
    return await this.repository.save(user);
  }

  async replace(id: string, replaceData: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.repository.findOneBy({ id });
    const newDate = new Date();

    const newUser = this.repository.create({
      ...replaceData,
      id,
      createdOn: existingUser?.createdOn || newDate,
      updatedOn: newDate,
    });

    return await this.repository.save(newUser);
  }

  async update(id: string, updateData: UpdateUserDto): Promise<UserEntity | null> {
    const user = {
      ...updateData,
      updatedOn: new Date(),
    }
    await this.repository.update(id, user);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: string): Promise<UserEntity | null> {
    const user = await this.repository.findOneBy({ id });
    if (user) {
      await this.repository.delete(id);
    }
    return user;
  }

  async seed() {
    const count = await this.repository.count();
    if (count === 0) {
      console.log('Seeding dummy data into Postgres...');
      await this.repository.save(dummyData);
      console.log(`Successfully seeded ${dummyData.length} users.`);
    } else {
      console.log("Database already contains data. skipping seed.")
    }
  }
}