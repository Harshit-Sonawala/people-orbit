import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { type User, type PaginatedUsers, UserRole } from './types';
import {
  QueryOptionsDto,
  CreateUserDto,
  UpdateUserDto,
  SortBy,
  Order,
} from './dto';
import { UsersRepository } from './users.repository';
import bcrypt from 'bcrypt';

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
    const foundUser = await this.usersRepository.findOne({ id: getId });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${getId} not found`);
    }
    return foundUser;
  }

  // POST create new record
  async create(createData: CreateUserDto): Promise<User> {
    const foundUser = await this.usersRepository.findOne({
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
      createdOn: newDate,
      updatedOn: newDate,
      isBanned: false,
    };
    return await this.usersRepository.createOrReplace(newUser);
  }

  // PUT Replace entire record based on id with a new User.
  async replace(replaceId: string, replaceData: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ id: replaceId });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${replaceId} not found`);
    } else {
      const newDate: number = Date.now();
      const newUser: User = {
        ...replaceData,
        id: existingUser?.id,
        password: 'PLACEHOLDER_PASS_HASH',
        role: existingUser?.role || UserRole.USER,
        createdOn: existingUser?.createdOn || newDate,
        updatedOn: newDate,
        isBanned: existingUser?.isBanned || false,
      };
      return await this.usersRepository.createOrReplace(newUser);
    }
  }

  // PATCH Update records partially
  async update(
    updateId: string,
    updateData: UpdateUserDto,
  ): Promise<User | null> {
    const existingUser = await this.usersRepository.findOne({ id: updateId });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${updateId} not found`);
    }
    const newDate: number = Date.now();
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
      throw new NotFoundException(`User with ID ${deleteId} not found`);
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
