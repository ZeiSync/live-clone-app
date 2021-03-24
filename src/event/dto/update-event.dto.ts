import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { CurrencyEnum } from '../schemas/currency.enum';

export class UpdateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  name?: string;

  @IsNotEmpty()
  @ApiProperty()
  description?: string;

  @IsUrl()
  @ApiProperty()
  thumbnailUrl?: string;

  @IsDateString()
  @ApiProperty()
  startDate?: Date;

  @IsDateString()
  @ApiProperty()
  startTime?: Date;

  @IsDateString()
  @ApiProperty()
  endTime?: Date;

  @IsNumber()
  @ApiProperty()
  ticketFee?: number;

  @IsNotEmpty()
  @IsIn([CurrencyEnum.JP, CurrencyEnum.US, CurrencyEnum.VND])
  @ApiProperty({
    enum: [CurrencyEnum.JP, CurrencyEnum.US, CurrencyEnum.VND],
  })
  currency?: CurrencyEnum;

  @IsBoolean()
  @ApiProperty()
  isLive?: boolean;

  @IsBoolean()
  @ApiProperty()
  isPublish?: boolean;
}
