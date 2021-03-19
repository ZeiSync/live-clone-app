import { Types } from 'mongoose';

export class UpdateUserDto {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  description?: string;
  picture?: string;
  locale?: string;
}
