import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PeopleService } from './people.service';
import type { People } from './types/people.type';
import { CreatePeopleDto } from './dto/create-people.dto';

@Controller('people') // for URL: /api/people
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getAllPeople(): People[] {
    return this.peopleService.getAll();
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
