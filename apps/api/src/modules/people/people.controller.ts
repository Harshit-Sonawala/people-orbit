import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';
import type { People } from './types/people.type';;

@Controller('people') // for URL: /people
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get()
    getAllPeople(): People[] {
        return this.peopleService.findAll();
    }

    @Get(':id')
    getPeople(@Param('id') id: number): People | undefined {
        return this.peopleService.findOne(Number(id));
    }
}
