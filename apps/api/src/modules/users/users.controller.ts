import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './types/user.type';
import type { PaginatedUsers } from './types/paginated-users.type';
import { QueryOptionsDto } from './dto/query-options.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsAuthenticated } from '@/common/guards/is-authenticated.guard';

@Controller('users') // for URL: /api/users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query() queryOptionsDto: QueryOptionsDto,
  ): Promise<PaginatedUsers> {
    return this.usersService.getAll(queryOptionsDto);
  }

  @Get('search')
  async searchUsers(
    @Query('q') query: string,
    @Query() queryOptionsDto: QueryOptionsDto,
  ): Promise<PaginatedUsers> {
    return this.usersService.search(query, queryOptionsDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Post()
  @UseGuards(IsAuthenticated)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('seed')
  async seedUsers(): Promise<{ message: string }> {
    await this.usersService.seed();
    return { message: 'Database seeding process completed' };
  }

  @Put(':id')
  @UseGuards(IsAuthenticated)
  async replaceUser(
    @Param('id') id: string,
    @Body() replaceUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.replace(id, replaceUserDto);
  }

  @Patch(':id')
  @UseGuards(IsAuthenticated)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(IsAuthenticated)
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
