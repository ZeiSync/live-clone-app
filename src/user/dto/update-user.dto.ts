export class UpdateUserDto {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  description?: string;
  picture?: string;
  locale?: string;
}
