import { Schema } from 'mongoose';

export interface IJwtPayload {
  _id?: Schema.Types.ObjectId;
  name: string;
  description?: string;
  email: string;
  phone?: string;
  locale?: string;
  picture?: string;
  googleId: string;
}
