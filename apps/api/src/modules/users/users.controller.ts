import { Controller, Get, Post, Body, Param, Query, Put, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetAllQueryOptionsDto, CreateUserDto, UpdateUserDto } from './dto';
import type { User, PaginatedUsers } from './types';

@Controller('users') // for URL: /api/users
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(@Query() paginationDto: GetAllQueryOptionsDto): PaginatedUsers {
    return this.usersService.getAll(paginationDto);
  }

  @Get(':id')
  getUsers(@Param('id') id: string): User | undefined {
    return this.usersService.getOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  replaceUser(@Param('id') id: string, @Body() replaceUserDto: CreateUserDto): User {
    return this.usersService.replace(id, replaceUserDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): User | undefined {
    return this.usersService.delete(id);
  }
}
