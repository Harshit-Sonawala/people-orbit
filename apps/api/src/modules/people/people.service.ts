import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAllQueryOptionsDto, CreatePeopleDto, UpdatePeopleDto } from './dto';
import { SortBy, Order } from './dto';
import type { People, PaginatedPeople } from './types';
import { dummyData } from './people.dummyData.static';

@Injectable()
export class PeopleService {
  allPeople: People[] = dummyData;

  // GET all records
  getAll(pageData: GetAllQueryOptionsDto): PaginatedPeople {
    const { page = 1, limit = 20, sortBy = SortBy.FIRST_NAME, order = Order.ASC } = pageData; // get query params, take default as 1 & 20.

    const sortedData = [...this.allPeople].sort((a, b) => {
      if (sortBy === SortBy.FIRST_NAME) {
        if (order === Order.ASC) {
          return a.firstName.localeCompare(b.firstName);
        } else {
          return b.firstName.localeCompare(a.firstName);
        }
      } else if (sortBy === SortBy.LAST_NAME) {
        if (order === Order.ASC) {
          return a.lastName.localeCompare(b.lastName);
        } else {
          return b.lastName.localeCompare(a.lastName);
        }
      } else if (sortBy === SortBy.UPDATED) {
        if (order === Order.ASC) {
          return a.updatedOn.getTime() - b.updatedOn.getTime();
        } else {
          return b.updatedOn.getTime() - a.updatedOn.getTime();
        }
      } else {
        if (order === Order.ASC) {
          return a.createdOn.getTime() - b.createdOn.getTime();
        } else {
          return b.createdOn.getTime() - a.createdOn.getTime();
        }
      }
    });

    const total = sortedData.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit; // every page jump by *limit
    const data = sortedData.slice(startIndex, startIndex + limit); // 0-19, 20-39, 40-59...

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
    const idSlug = `${createData.firstName.toLowerCase().replace(/\s+/g, '-')}-${createData.lastName.toLowerCase().replace(/\s+/g, '-')}-${newDate.getTime()}`;
    const newPeople: People = {
      ...createData,
      id: idSlug,
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
