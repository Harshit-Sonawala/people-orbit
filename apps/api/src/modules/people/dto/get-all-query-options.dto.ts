import { IsOptional, IsInt, Min, IsEnum, ValidateIf, IsNotEmpty } from 'class-validator';
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
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsEnum(SortBy)
  // If order present, sortBy is mandatory
  @ValidateIf(o => o.order !== undefined)
  @IsNotEmpty({ message: 'sortBy is required when order is provided' })
  sortBy?: SortBy;

  @IsEnum(Order)
  // If sortBy is present, order becomes mandatory
  @ValidateIf(o => o.sortBy !== undefined)
  @IsNotEmpty({ message: 'order is required when sortBy is provided' })
  order?: Order;
}
