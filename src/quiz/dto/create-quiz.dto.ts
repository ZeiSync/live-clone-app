import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Answer } from '../schema/answer.schema';

export class CreateQuizDto {
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsMongoId()
  @ApiProperty()
  event: string;

  @ApiProperty()
  answers: Answer[];
}
