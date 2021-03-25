import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password_too_weak',
  })
  @ApiProperty()
  password?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  picture?: string;

  @ApiProperty()
  locale?: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty()
  phone?: string;

  @ApiProperty()
  description?: string;
}
