import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class SignUpDto {
  @IsMongoId()
  @IsOptional()
  _id: Types.ObjectId;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @ApiProperty({ description: 'username' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'email' })
  email: string;

  @ApiProperty()
  @IsNumberString()
  phone?: string;
}
