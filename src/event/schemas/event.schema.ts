import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CurrencyEnum } from './currency.enum';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  thumbnailUrl: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop()
  @ApiProperty()
  startDate: Date;

  @Prop()
  @ApiProperty()
  startTime: Date;

  @Prop()
  @ApiProperty()
  endTime: Date;

  @Prop()
  @ApiProperty()
  ticketFee: number;

  @Prop()
  @ApiProperty()
  currency: CurrencyEnum;

  @Prop()
  @ApiProperty()
  isLive: boolean;

  @Prop()
  @ApiProperty()
  isPublish: boolean;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty()
  ownerId: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);
