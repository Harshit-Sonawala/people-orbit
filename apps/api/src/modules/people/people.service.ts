import { Injectable } from '@nestjs/common';
import type { People } from './types/People';
import { dummyPeopleData } from './dummyPeopleData.static';

@Injectable()
export class PeopleService {
    findAll(): People[] {
        return dummyPeopleData;
    }

    findOne(id: number): People | undefined {
        return dummyPeopleData.find(People => People.id === id);
    }
}
