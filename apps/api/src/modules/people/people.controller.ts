import { Controller, Get, Post, Body, Param, Query, Put, Patch, Delete } from '@nestjs/common';
import { PeopleService } from './people.service';
import { GetAllQueryOptionsDto, CreatePeopleDto, UpdatePeopleDto } from './dto';
import type { People, PaginatedPeople } from './types';

@Controller('people') // for URL: /api/people
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Get()
  getAllPeople(@Query() paginationDto: GetAllQueryOptionsDto): PaginatedPeople {
    return this.peopleService.getAll(paginationDto);
  }

  @Get(':id')
  getPeople(@Param('id') id: string): People | undefined {
    return this.peopleService.getOne(id);
  }

  @Post()
  createPeople(@Body() createPeopleDto: CreatePeopleDto): People {
    return this.peopleService.create(createPeopleDto);
  }

  @Put(':id')
  replacePeople(@Param('id') id: string, @Body() replacePeopleDto: CreatePeopleDto): People {
    return this.peopleService.replace(id, replacePeopleDto);
  }

  @Patch(':id')
  updatePeople(@Param('id') id: string, @Body() updatePeopleDto: UpdatePeopleDto): People {
    return this.peopleService.update(id, updatePeopleDto);
  }

  @Delete(':id')
  deletePeople(@Param('id') id: string): People | undefined {
    return this.peopleService.delete(id);
  }
}
