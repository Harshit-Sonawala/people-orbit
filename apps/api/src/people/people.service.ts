import { Injectable } from '@nestjs/common';
import { Person } from '../../../shared-types/Person';
import { dummyPersonData } from '../../../shared-types/dummyPersonData';

@Injectable()
export class PeopleService {
    findAll(): Person[] {
        return dummyPersonData;
    }

    findOne(id: number): Person | undefined {
        return dummyPersonData.find(person => person.id === id);
    }
}
