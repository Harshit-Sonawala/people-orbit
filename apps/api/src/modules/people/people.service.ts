import { Injectable } from '@nestjs/common';
import type { People } from './types/people.type';
import { dummyData } from './people.dummyData.static';
import { CreatePeopleDto } from './dto/create-people.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedPeople } from './types/people.type';

@Injectable()
export class PeopleService {
  allPeople: People[] = dummyData;

  getAll(paginationDto: PaginationDto): PaginatedPeople {
    const { page = 1, limit = 20 } = paginationDto; // get query params, take default as 1 & 20.
    const total = this.allPeople.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit; // every page jump by *limit
    const data = this.allPeople.slice(startIndex, startIndex + limit); // 0-19, 20-39, 40-59...
    return {
      data,
      meta: {
        total: total,
        limit: limit,
        totalPages: totalPages,
        currentPage: page,
      }
    };
  }

  getOne(id: number): People | undefined {
    return this.allPeople.find((person) => person.id === id);
  }

  create(createPeopleDto: CreatePeopleDto): People {
    const newPerson: People = {
      id:
        this.allPeople.length > 0
          ? Math.max(...this.allPeople.map((p) => p.id)) + 1
          : 1,
      ...createPeopleDto,
    };
    this.allPeople.push(newPerson);
    return newPerson;
  }
}
