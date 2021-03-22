import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Types } from 'mongoose';
import { CurrencyEnum } from '../schemas/currency.enum';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  // @IsUrl() // need file upload for this
  @IsNotEmpty()
  @ApiProperty()
  thumbnailUrl: string;

  @IsDateString()
  @ApiProperty()
  startDate: Date;

  @IsDateString()
  @ApiProperty()
  startTime: Date;

  @IsDateString()
  @ApiProperty()
  endTime: Date;

  @IsNumber()
  @ApiProperty()
  ticketFee: number;

  @IsNotEmpty()
  @IsIn([CurrencyEnum.JP, CurrencyEnum.US, CurrencyEnum.VND])
  @ApiProperty({
    enum: [CurrencyEnum.JP, CurrencyEnum.US, CurrencyEnum.VND],
  })
  currency: CurrencyEnum;

  @IsBoolean()
  @ApiProperty({ default: false })
  isLive: boolean;

  @IsBoolean()
  @ApiProperty({ default: false })
  isPublish: boolean;

  ownerId: Types.ObjectId;
}
