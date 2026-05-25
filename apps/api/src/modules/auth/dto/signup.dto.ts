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
  @MaxLength(30)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  lastName!: string;

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
  @MaxLength(40)
  designation!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone!: string;
}
