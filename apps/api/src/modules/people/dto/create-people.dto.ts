import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEmail,
  IsPhoneNumber,
  Max,
  MaxLength,
  IsOptional,
  IsUrl,
  IsArray,
  ValidateNested,
  Min,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { People } from '../types/people.type';

class SocialLinks {
  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsUrl()
  github?: string;
}

export class CreatePeopleDto implements Omit<People, 'id' | 'createdOn'> {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  lastName!: string;

  @IsOptional()
  @Type(() => Number) // Convert into number if string was passed
  @IsInt() // ensures whole integer
  @Min(0)
  @Max(120)
  age?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  designation!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  phone!: string;

  @IsOptional()
  @IsString()
  @MaxLength(140)
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SocialLinks)
  socialLinks!: SocialLinks;

  @IsOptional()
  @IsUrl()
  profilePic?: string;
  
  @IsOptional()
  @IsUrl()
  bgImage?: string;

  // @IsNotEmpty()
  // @Type(() => Date) // Convert ISO string into Date obj
  // @IsDate()
  // createdOn!: Date;
}
