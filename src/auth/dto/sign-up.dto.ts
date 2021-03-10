import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @ApiProperty({ type: String, description: 'username' })
  name: string;

  @IsEmail()
  @ApiProperty({ type: String, description: 'emai' })
  email: string;
}
