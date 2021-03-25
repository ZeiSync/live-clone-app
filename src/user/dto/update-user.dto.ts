import {
  IsEmail,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsMongoId()
  @IsOptional()
  _id?: Types.ObjectId;

  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password_too_weak',
  })
  @IsOptional()
  password?: string;

  @IsNumberString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  picture?: string;

  @IsOptional()
  locale?: string;
}
