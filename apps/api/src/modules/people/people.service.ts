import { Injectable, NotFoundException } from '@nestjs/common';
import type { People } from './types/people.type';
import type { PaginatedPeople } from './types/people.type';
import { CreatePeopleDto } from './dto/create-people.dto';
import { PaginationDto } from './dto/pagination.dto';
import { dummyData } from './people.dummyData.static';
import { ReplacePeopleDto } from './dto/replace-people.dto';

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
      },
    };
  }

  getOne(getId: string): People | undefined {
    const foundPerson = this.allPeople.find((p) => p.id === getId);
    if (!foundPerson) {
      throw new NotFoundException(`Person with ID ${getId} not found`);
    }
    return foundPerson;
  }

  create(createPeopleDto: CreatePeopleDto): People {
    const newDate: Date = new Date();
    const newPeople: People = {
      ...createPeopleDto,
      id:
        this.allPeople.length > 0
          ? (Math.max(...this.allPeople.map((p) => Number(p.id))) + 1).toString()
          : "1",
      createdOn: newDate,
      updatedOn: newDate,
    };
    this.allPeople.push(newPeople);
    return newPeople;
  }

  // Replace person on an id with a new person
  replace(replaceId: string, replacePeopleDto: ReplacePeopleDto): People {
    const newDate: Date = new Date();
    const newPeople: People = {
      ...replacePeopleDto,
      id: replaceId,
      createdOn: newDate, // replace created date as new person record
      updatedOn: newDate,
    };

    // dummy replace logic
    const replaceIndex = this.allPeople.findIndex((p) => p.id === replaceId);
    if (replaceIndex === -1) throw new NotFoundException(`Person with ID ${replaceId} not found`);
    this.allPeople[replaceIndex] = newPeople;

    return newPeople;
  }

  // update(updateId: string, updatePeopleDto: UpdatePeopleDto): People | undefined {
  //   const updatedPeople: People = updatePeopleDto;
  //   return undefined;
  // }

  // delete(replaceId: string): People | undefined {
  //   const deleteIndex = this.allPeople.findIndex((p) => p.id === id);
  //   if (deleteIndex === -1) return undefined;
  //   const deletedPeople = this.allPeople.splice(deleteIndex, 1)[0];

  //   return deletedPeople;
  // }
}
