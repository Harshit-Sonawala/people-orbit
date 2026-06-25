import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(200)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(128)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  designation!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  company!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone!: string;
}
