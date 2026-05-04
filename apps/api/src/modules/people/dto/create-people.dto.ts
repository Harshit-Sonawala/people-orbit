import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEmail,
  Max,
  MaxLength,
  IsOptional,
  IsUrl,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { People } from '../types/people.type';
import { SocialLinksDto } from './social-links.dto';

export class CreatePeopleDto implements Omit<People, 'id' | 'createdOn' | 'updatedOn'> {
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
  @Min(16, { message: "User must be atleast 16 years of age to join." })
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
  @MaxLength(20)
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
  @Type(() => SocialLinksDto)
  socialLinks!: SocialLinksDto;

  @IsOptional()
  @IsUrl()
  profilePic?: string;

  @IsOptional()
  @IsUrl()
  bgImage?: string;
}
