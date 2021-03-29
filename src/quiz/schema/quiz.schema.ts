import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Event } from 'src/event/schemas/event.schema';
import { Answer, AnswerSchema } from './answer.schema';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  @ApiProperty()
  question: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({
    type: [AnswerSchema],
  })
  @ApiProperty()
  answers: Answer[];

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Event', required: true })
  @ApiProperty()
  event: Event;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
