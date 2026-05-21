import { Injectable, NotFoundException } from '@nestjs/common';
import type { User, PaginatedUsers } from './types';
import {
  QueryOptionsDto,
  CreateUserDto,
  UpdateUserDto,
  SortBy,
  Order,
} from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // GET all records
  async getAll(pageData: QueryOptionsDto): Promise<PaginatedUsers> {
    const {
      page = 1,
      limit = 28,
      sortBy = SortBy.CREATED,
      order = Order.ASC,
    } = pageData;

    const sortFieldMap: Record<SortBy, string> = {
      [SortBy.CREATED]: 'createdOn',
      [SortBy.UPDATED]: 'updatedOn',
      [SortBy.FIRST_NAME]: 'firstName',
      [SortBy.LAST_NAME]: 'lastName',
    };
    const orderMap: Record<Order, string> = {
      [Order.ASC]: 'ASC',
      [Order.DESC]: 'DESC',
    };

    const [data, total] = await this.usersRepository.findAll(
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
    const foundPerson = await this.usersRepository.findOne(getId);
    if (!foundPerson) {
      throw new NotFoundException(`Person with ID ${getId} not found`);
    }
    return foundPerson;
  }

  // POST create new record
  async create(createData: CreateUserDto): Promise<User> {
    const newDate = Date.now();
    const idSlug = `${createData.firstName.toLowerCase().replace(/\s+/g, '-')}-${createData.lastName.toLowerCase().replace(/\s+/g, '-')}-${newDate}`;
    const newUser = {
      ...createData,
      id: idSlug,
      createdOn: newDate,
      updatedOn: newDate,
    };
    return await this.usersRepository.createOrReplace(newUser);
  }

  // PUT Replace entire record based on id with a new person.
  async replace(replaceId: string, replaceData: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne(replaceId);
    if (!existingUser) {
      throw new NotFoundException(`Person with ID ${replaceId} not found`);
    } else {
      const newDate = Date.now();
      const newUser = {
        ...replaceData,
        id: existingUser?.id,
        createdOn: existingUser?.createdOn || newDate,
        updatedOn: newDate,
      };
      return await this.usersRepository.createOrReplace(newUser);
    }
  }

  // PATCH Update records partially
  async update(
    updateId: string,
    updateData: UpdateUserDto,
  ): Promise<User | null> {
    const existingUser = await this.usersRepository.findOne(updateId);
    if (!existingUser) {
      throw new NotFoundException(`Person with ID ${updateId} not found`);
    }
    const newDate = Date.now();
    const partialUpdatedUser: Partial<User> = {
      // building a partial user payload
      ...updateData,
      updatedOn: newDate,
    };
    return await this.usersRepository.update(updateId, partialUpdatedUser);
  }

  // DELETE record by ID
  async delete(deleteId: string): Promise<User> {
    const deletedUser = await this.usersRepository.delete(deleteId);
    if (!deletedUser) {
      throw new NotFoundException(`Person with ID ${deleteId} not found`);
    }
    return deletedUser;
  }

  // POST seed initial data to the db
  async seed(): Promise<void> {
    return await this.usersRepository.seed();
  }

  // GET search results based on query
  async search(
    query: string,
    pageData: QueryOptionsDto,
  ): Promise<PaginatedUsers> {
    const { page = 1, limit = 28 } = pageData;
    const [data, total] = await this.usersRepository.search(query, page, limit);
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
}
