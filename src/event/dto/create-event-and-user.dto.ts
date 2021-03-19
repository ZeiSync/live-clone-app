import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { CreateEventDto } from './create-event.dto';

export class CreateEventAndUserDto {
  @ValidateNested()
  @Type(() => CreateEventDto)
  @ApiProperty()
  event: CreateEventDto;

  @ValidateNested()
  @Type(() => SignUpDto)
  @ApiProperty()
  user: SignUpDto;
}
