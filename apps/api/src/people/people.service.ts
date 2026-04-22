import { Injectable } from '@nestjs/common';
import type { Person } from '../types/Person';
import { dummyPersonData } from '../types/dummyPersonData';

@Injectable()
export class PeopleService {
    findAll(): Person[] {
        return dummyPersonData;
    }

    findOne(id: number): Person | undefined {
        return dummyPersonData.find(person => person.id === id);
    }
}
