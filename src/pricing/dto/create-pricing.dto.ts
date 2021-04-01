import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, Min } from 'class-validator';
import { PricingType } from '../schemas/pricinng-type.enum';

export class CreatePricingDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @IsIn([PricingType.BASIC, PricingType.PRO, PricingType.BUSINESS])
  @ApiProperty({
    enum: [PricingType.BASIC, PricingType.PRO, PricingType.BUSINESS],
  })
  type: PricingType;

  @IsInt()
  @Min(0)
  @ApiProperty()
  price: number;
}
