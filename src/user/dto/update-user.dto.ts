export class UpdateUserDto {
  readonly name: string;
  readonly password?: string;
  readonly phone?: string;
  readonly description?: string;
  readonly picture?: string;
  readonly locale?: string;
}
