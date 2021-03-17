import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransparentType } from './transparent-type.enum';

export type TransparentDocument = Transparent & Document;

@Schema({ timestamps: true })
export class Transparent {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: TransparentType;

  @Prop({ required: true })
  price: number;
}

export const TransparentSchema = SchemaFactory.createForClass(Transparent);
