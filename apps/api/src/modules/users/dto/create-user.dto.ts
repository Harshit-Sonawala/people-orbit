import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEmail,
  Max,
  MinLength,
  MaxLength,
  IsOptional,
  IsUrl,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../types';
import { SocialLinksDto } from './social-links.dto';

export class CreateUserDto implements Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'isBanned' | 'role'
> {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  lastName!: string;

  @IsOptional()
  @Type(() => Number) // Convert into number if string was passed
  @IsInt() // ensures whole integer
  @Min(16, { message: 'User must be atleast 16 years of age to join.' })
  @Max(120)
  age?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  designation!: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(128)
  password!: string;

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

  @IsOptional()
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
