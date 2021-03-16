import { Schema } from 'mongoose';

export class UpdateUserDto {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  description?: string;
  picture?: string;
  locale?: string;
}
