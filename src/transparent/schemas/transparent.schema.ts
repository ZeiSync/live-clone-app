import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { TransparentType } from './transparent-type.enum';

export type TransparentDocument = Transparent & Document;

@Schema({ timestamps: true })
export class Transparent {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  type: TransparentType;

  @Prop({ required: true })
  @ApiProperty()
  price: number;
}

export const TransparentSchema = SchemaFactory.createForClass(Transparent);
