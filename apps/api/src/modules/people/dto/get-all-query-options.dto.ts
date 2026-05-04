import { IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortBy {
  CREATED = 'dateCreated',
  UPDATED = 'dateUpdated',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetAllQueryOptionsDto { // For Query parameters like page & limit
  @IsOptional()
  @Type(() => Number) // transform into number
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.FIRST_NAME;

  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.ASC;
}
