import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransparentDocument = Transparent & Document;

@Schema({ timestamps: true })
export class Transparent {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  price: number;
}

export const TransparentSchema = SchemaFactory.createForClass(Transparent);
