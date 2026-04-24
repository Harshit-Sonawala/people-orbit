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
} from 'class-validator';
import { Type } from 'class-transformer';
import { People } from '../types/people.type';

class SocialLinks {
  @IsUrl()
  @IsOptional()
  linkedIn?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsUrl()
  @IsOptional()
  github?: string;
}

export class CreatePeopleDto implements Omit<People, 'id'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  lastName!: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(120)
  age?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  designation!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
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

  @IsUrl()
  @IsNotEmpty()
  profilePic!: string;

  @IsUrl()
  @IsNotEmpty()
  bgImage!: string;
}
