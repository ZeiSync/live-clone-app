import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, Min } from 'class-validator';
import { TransparentType } from '../schemas/transparent-type.enum';

export class CreateTransparentDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @IsIn([TransparentType.BASIC, TransparentType.PRO, TransparentType.BUSINESS])
  @ApiProperty({
    enum: [
      TransparentType.BASIC,
      TransparentType.PRO,
      TransparentType.BUSINESS,
    ],
  })
  type: TransparentType;

  @IsInt()
  @Min(0)
  @ApiProperty()
  price: number;
}
