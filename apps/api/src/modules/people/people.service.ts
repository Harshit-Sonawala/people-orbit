import { Injectable, NotFoundException } from '@nestjs/common';
import type { People } from './types/people.type';
import type { PaginatedPeople } from './types/people.type';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { dummyData } from './people.dummyData.static';

@Injectable()
export class PeopleService {
  allPeople: People[] = dummyData;

  // GET all records
  getAll(pageData: PaginationDto): PaginatedPeople {
    const { page = 1, limit = 20 } = pageData; // get query params, take default as 1 & 20.
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

  // GET record by ID
  getOne(getId: string): People | undefined {
    const foundPerson = this.allPeople.find((p) => p.id === getId);
    if (!foundPerson) {
      throw new NotFoundException(`Person with ID ${getId} not found`);
    }
    return foundPerson;
  }

  // POST create new record
  create(createData: CreatePeopleDto): People {
    const newDate: Date = new Date();
    const newPeople: People = {
      ...createData,
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

  // PUT Replace entire record based on id with a new person
  replace(replaceId: string, replaceData: CreatePeopleDto): People {
    const newDate: Date = new Date();
    const replacedPeople: People = {
      ...replaceData,
      id: replaceId,
      createdOn: newDate, // replace created date as new person record
      updatedOn: newDate,
    };
    // dummy replace logic
    const replaceIndex = this.allPeople.findIndex((p) => p.id === replaceId);
    if (replaceIndex === -1) throw new NotFoundException(`Person with ID ${replaceId} not found`);
    this.allPeople[replaceIndex] = replacedPeople;
    return replacedPeople;
  }

  // PATCH Update records partially
  update(updateId: string, updateData: UpdatePeopleDto): People {
    const updateIndex = this.allPeople.findIndex((p) => p.id === updateId);
    if (updateIndex === -1) throw new NotFoundException(`Person with ID ${updateId} not found`);

    const updatedPeople: People = {
      ...this.allPeople[updateIndex], // id: updateIndex
      ...updateData,
      updatedOn: new Date(),
    }

    // dummy update logic
    this.allPeople[updateIndex] = updatedPeople;
    return updatedPeople;
  }

  // DELETE record by ID
  delete(deleteId: string): People | undefined {
    const deleteIndex = this.allPeople.findIndex((p) => p.id === deleteId);
    if (deleteIndex === -1) throw new NotFoundException(`Person with ID ${deleteId} not found`);
    //dummy delete logic
    const deletedPeople = this.allPeople.splice(deleteIndex, 1)[0]; // splice and return
    return deletedPeople;
  }
}
