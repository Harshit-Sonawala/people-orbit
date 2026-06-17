import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { type User, type PaginatedUsers, UserRole, UserStats } from './types';
import { QueryOptionsDto, CreateUserDto, UpdateUserDto } from './dto';
import { SortBy, Order } from './dto/query-options.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  // GET all records
  async getAll(pageData: QueryOptionsDto): Promise<PaginatedUsers> {
    const {
      page = 1,
      limit = 28,
      sortBy = SortBy.CREATED,
      order = Order.ASC,
    } = pageData;

    const sortFieldMap: Record<SortBy, string> = {
      [SortBy.CREATED]: 'createdAt',
      [SortBy.UPDATED]: 'updatedAt',
      [SortBy.FIRST_NAME]: 'firstName',
      [SortBy.LAST_NAME]: 'lastName',
    };
    const orderMap: Record<Order, string> = {
      [Order.ASC]: 'ASC',
      [Order.DESC]: 'DESC',
    };

    const [data, total] = await this.usersRepo.findAll(
      page,
      limit,
      sortFieldMap[sortBy],
      orderMap[order],
    );
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

  // GET record by ID
  async getOne(getId: string): Promise<User> {
    const foundUser = await this.usersRepo.findOne({ id: getId });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${getId} not found`);
    }
    return foundUser;
  }

  // POST create new record
  async create(createData: CreateUserDto): Promise<User> {
    const foundUser = await this.usersRepo.findOne({
      email: createData.email,
    });
    // Already exists: throw 409 Conflict Error
    if (foundUser) {
      throw new ConflictException(
        `User with email ${createData.email} already exists`,
      );
    }
    const newDate = Date.now();
    const idSlug: string = `${createData.firstName.toLowerCase().replace(/\s+/g, '-')}-${createData.lastName.toLowerCase().replace(/\s+/g, '-')}-${newDate}`;
    const hashedPassword = await bcrypt.hash(createData.password, 10);
    const newUser: User = {
      ...createData,
      id: idSlug,
      password: hashedPassword,
      role: UserRole.USER,
      createdAt: newDate,
      updatedAt: newDate,
      isBanned: false,
    };
    return await this.usersRepo.createOrReplace(newUser);
  }

  // PUT Replace entire record based on id with a new User.
  async replace(replaceId: string, replaceData: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepo.findOne({ id: replaceId });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${replaceId} not found`);
    } else {
      const newDate: number = Date.now();
      const newUser: User = {
        ...replaceData,
        id: existingUser?.id,
        password: 'PLACEHOLDER_PASS_HASH',
        role: existingUser?.role || UserRole.USER,
        createdAt: existingUser?.createdAt || newDate,
        updatedAt: newDate,
        isBanned: existingUser?.isBanned || false,
      };
      return await this.usersRepo.createOrReplace(newUser);
    }
  }

  // PATCH Update records partially
  async update(
    updateId: string,
    updateData: UpdateUserDto,
  ): Promise<User | null> {
    const existingUser = await this.usersRepo.findOne({ id: updateId });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${updateId} not found`);
    }
    const newDate: number = Date.now();
    const partialUpdatedUser: Partial<User> = {
      // building a partial user payload
      ...updateData,
      updatedAt: newDate,
    };
    return await this.usersRepo.update(updateId, partialUpdatedUser);
  }

  // DELETE record by ID
  async delete(deleteId: string): Promise<User> {
    const deletedUser = await this.usersRepo.deleteOne(deleteId);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${deleteId} not found`);
    }
    return deletedUser;
  }

  // POST seed initial data to the db
  async seed(): Promise<void> {
    return await this.usersRepo.seed();
  }

  // GET search results based on query
  async search(
    query: string,
    pageData: QueryOptionsDto,
  ): Promise<PaginatedUsers> {
    const { page = 1, limit = 28 } = pageData;
    const [data, total] = await this.usersRepo.search(query, page, limit);
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

  // GET dashboard statistics
  async getStats(): Promise<UserStats> {
    return await this.usersRepo.getStats();
  }
}
