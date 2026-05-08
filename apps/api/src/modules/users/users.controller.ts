import { Controller, Get, Post, Body, Param, Query, Put, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetAllQueryOptionsDto, CreateUserDto, UpdateUserDto } from './dto';
import type { User, PaginatedUsers } from './types';

@Controller('users') // for URL: /api/users
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAllUsers(@Query() paginationDto: GetAllQueryOptionsDto): Promise<PaginatedUsers> {
    return this.usersService.getAll(paginationDto);
  }

  @Get(':id')
  async getUsers(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  async replaceUser(@Param('id') id: string, @Body() replaceUserDto: CreateUserDto): Promise<User> {
    return this.usersService.replace(id, replaceUserDto);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Post('seed')
  async seedUsers(): Promise<{ message: string }> {
    await this.usersService.seed();
    return { message: 'Database seeding process completed' };
  }
}
