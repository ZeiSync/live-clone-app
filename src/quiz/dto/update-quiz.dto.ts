import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Answer } from '../schema/answer.schema';

export class UpdateQuizDto {
  @IsOptional()
  @ApiProperty()
  question: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty({ type: [Answer] })
  answers: Answer[];
}
