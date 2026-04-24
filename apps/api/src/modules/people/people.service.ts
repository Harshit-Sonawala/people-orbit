import { Injectable } from '@nestjs/common';
import type { People } from './types/people.type';
import { dummyData } from './people.dummyData.static';

@Injectable()
export class PeopleService {
    findAll(): People[] {
        return dummyData;
    }

    findOne(id: number): People | undefined {
        return dummyData.find(person => person.id === id);
    }
}
