import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from './decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@UseGuards(AuthGuard())
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@GetUser() user: User): Promise<User> {
    delete user['_doc'].password;
    return user;
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userUpdated = await this.userService.update(user['_id'], {
      ...user['_doc'],
      ...updateUserDto,
    });
    delete userUpdated['_doc'].password;
    return userUpdated;
  }
}
