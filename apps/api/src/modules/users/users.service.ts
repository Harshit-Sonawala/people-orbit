import { Injectable, NotFoundException } from '@nestjs/common';
import type { User, PaginatedUsers } from './types';
import { GetAllQueryOptionsDto, CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  // GET all records
  async getAll(pageData: GetAllQueryOptionsDto): Promise<PaginatedUsers> {
    return this.usersRepository.findAll(pageData);
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
    return this.usersRepository.create(createData);
  }

  // PUT Replace entire record based on id with a new person
  async replace(replaceId: string, replaceData: CreateUserDto): Promise<User> {
    const replacedUser = await this.usersRepository.replace(replaceId, replaceData);
    if (!replacedUser) {
      throw new NotFoundException(`Person with ID ${replaceId} not found`);
    }
    return replacedUser;
  }

  // PATCH Update records partially
  async update(updateId: string, updateData: UpdateUserDto): Promise<User> {
    const updatedUser = await this.usersRepository.update(updateId, updateData);
    if (!updatedUser) {
      throw new NotFoundException(`Person with ID ${updateId} not found`);
    }
    return updatedUser;
  }

  // DELETE record by ID
  async delete(deleteId: string): Promise<User> {
    const deletedUser = await this.usersRepository.delete(deleteId);
    if (!deletedUser) {
      throw new NotFoundException(`Person with ID ${deleteId} not found`);
    }
    return deletedUser;
  }

  async seed(): Promise<void> {
    return this.usersRepository.seed();
  }
}
