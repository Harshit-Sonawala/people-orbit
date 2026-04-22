import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';
import type { Person } from '../../../shared-types/Person';

@Controller('people') // for URL: /people
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get()
    getAllPeople(): Person[] {
        return this.peopleService.findAll();
    }

    @Get(':id')
    getPerson(@Param('id') id: number): Person | undefined {
        return this.peopleService.findOne(id);
    }
}
