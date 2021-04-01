import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { PricingType } from './pricinng-type.enum';

export type PricingDocument = Pricing & Document;

@Schema({ timestamps: true })
export class Pricing {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ required: true })
  @ApiProperty()
  type: PricingType;

  @Prop({ required: true })
  @ApiProperty()
  price: number;
}

export const PricingSchema = SchemaFactory.createForClass(Pricing);
