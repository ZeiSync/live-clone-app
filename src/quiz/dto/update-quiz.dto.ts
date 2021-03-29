import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { Answer } from '../schema/answer.schema';

export class UpdateQuizDto {
  @IsOptional()
  @ApiProperty()
  question: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  event: string;

  @IsOptional()
  @ApiProperty()
  answers: Answer[];
}
