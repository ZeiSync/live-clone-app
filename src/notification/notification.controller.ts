import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from 'src/pipes/objectid.pipes';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';
import { Notification } from './schema/notification.schema';

@ApiTags('Notification')
@UseGuards(AuthGuard())
@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  @ApiOkResponse({ type: [Notification] })
  async getNotifications(@GetUser() user: User): Promise<Notification[]> {
    return await this.notificationService.find({ user: user['_id'] });
  }

  @Post()
  @ApiBody({ type: CreateNotificationDto })
  @ApiCreatedResponse({ type: Notification })
  @UsePipes(ValidationPipe)
  async createNotification(
    @GetUser() user: User,
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationService.createNotification(
      user,
      createNotificationDto,
    );
  }

  @Get('/:id')
  @ApiOkResponse()
  async markAsRead(
    @Param('id', ParseObjectIdPipe) id: string,
    @GetUser() user: User,
  ) {
    return this.notificationService.markAsRead(id, user);
  }

  @Get('mark-all-as-read')
  @ApiOkResponse()
  async markAllAsRead(@GetUser() user: User) {
    return this.notificationService.markAllAsRead(user);
  }
}
