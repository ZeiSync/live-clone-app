export interface IJwtPayload {
  _id?: string;
  name: string;
  description?: string;
  email: string;
  phone?: string;
  locale?: string;
  picture?: string;
}

export type IGooglePayload = IJwtPayload;
