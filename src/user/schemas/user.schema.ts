import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Transparent } from 'src/transparent/schemas/transparent.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop()
  @ApiProperty()
  phone: string;

  @Prop()
  @ApiProperty()
  locale: string;

  @Prop()
  @ApiProperty()
  picture: string;

  @Prop()
  @ApiProperty()
  googleId: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Transparent' })
  @ApiProperty()
  transparent: Transparent;
}

export const UserSchema = SchemaFactory.createForClass(User);
