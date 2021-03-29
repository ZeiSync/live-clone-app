import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsBoolean()
  @ApiProperty()
  isRead: boolean;
}
