import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    uniqueItems: true,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    example: 'Password123',
    description: 'User password (must contain uppercase, lowercase, and number)',
    minLength: 6,
    maxLength: 50,
  })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  fullName: string;
}
