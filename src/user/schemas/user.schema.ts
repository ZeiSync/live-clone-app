import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Transparent } from 'src/transparent/schemas/transparent.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  locale: string;

  @Prop()
  picture: string;

  @Prop()
  googleId: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Transparent' })
  transparent: Transparent;
}

export const UserSchema = SchemaFactory.createForClass(User);
