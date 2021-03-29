import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AnswerDocument = Answer & Document;

@Schema({ timestamps: true })
export class Answer {
  @Prop({ required: true })
  @ApiProperty()
  option: string;

  @Prop({ required: true })
  @ApiProperty()
  isCorrect: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
