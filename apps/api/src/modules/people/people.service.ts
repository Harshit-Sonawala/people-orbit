import { Injectable } from '@nestjs/common';
import type { People } from './types/people.type';
import { dummyData } from './people.dummyData.static';
import { CreatePeopleDto } from './dto/create-people.dto';

@Injectable()
export class PeopleService {
    allPeople: People[] = dummyData;

    getAll(): People[] {
        return this.allPeople;
    }

    getOne(id: number): People | undefined {
        return this.allPeople.find(person => person.id === id);
    }

    create(createPeopleDto: CreatePeopleDto): People {
        const newPerson: People = {
            id: this.allPeople.length > 0 
                ? Math.max(...this.allPeople.map(p => p.id)) + 1 
                : 1,
            ...createPeopleDto
        };
        this.allPeople.push(newPerson);
        return newPerson;
    }
}
