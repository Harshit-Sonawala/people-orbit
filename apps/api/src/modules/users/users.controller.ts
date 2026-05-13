import { Controller, Get, Post, Body, Param, Query, Put, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { QueryOptionsDto, CreateUserDto, UpdateUserDto } from './dto';
import type { User, PaginatedUsers } from './types';

@Controller('users') // for URL: /api/users
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAllUsers(@Query() queryOptionsDto: QueryOptionsDto): Promise<PaginatedUsers> {
    return this.usersService.getAll(queryOptionsDto);
  }

  @Get('search')
  async searchUsers(@Query('q') query: string, @Query() queryOptionsDto: QueryOptionsDto): Promise<PaginatedUsers> {
    return this.usersService.search(query, queryOptionsDto);
  }

  @Get(':id')
  async getUsers(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('seed')
  async seedUsers(): Promise<{ message: string }> {
    await this.usersService.seed();
    return { message: 'Database seeding process completed' };
  }

  @Put(':id')
  async replaceUser(@Param('id') id: string, @Body() replaceUserDto: CreateUserDto): Promise<User> {
    return this.usersService.replace(id, replaceUserDto);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
