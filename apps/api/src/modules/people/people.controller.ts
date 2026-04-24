import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePeopleDto } from './dto/create-people.dto';
import type { People } from './types/people.type';
import type { PaginatedPeople } from './types/people.type';

@Controller('people') // for URL: /api/people
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getAllPeople(@Query() paginationDto: PaginationDto): PaginatedPeople {
    return this.peopleService.getAll(paginationDto);
  }

  @Get(':id')
  getPeople(@Param('id') id: number): People | undefined {
    return this.peopleService.getOne(Number(id));
  }

  @Post()
  createPeople(@Body() createPeopleDto: CreatePeopleDto): People {
    return this.peopleService.create(createPeopleDto);
  }
}
