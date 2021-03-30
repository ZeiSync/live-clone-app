import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @ApiProperty({ type: String })
  user: User;

  @Prop()
  @ApiProperty()
  content: string;

  @Prop({ default: false })
  @ApiProperty()
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
