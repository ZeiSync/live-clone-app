import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';
import { User } from 'src/user/schemas/user.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  Notification,
  NotificationDocument,
} from './schema/notification.schema';

@Injectable()
export class NotificationService extends BaseService<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {
    super(notificationModel);
  }

  async createNotification(
    user: User,
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    try {
      const notification = {
        ...createNotificationDto,
        user: user['_id'],
      };
      return await this.create(notification);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async markAsRead(id: string, user: User) {
    try {
      const notification = await this.findOne({ _id: id, user: user['_id'] });
      if (!notification) {
        throw new NotFoundException('notification_not_found');
      }

      await this.update(id, { isRead: true });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async markAllAsRead(user: User) {
    try {
      await this.notificationModel.updateMany(
        {
          user: user['_id'],
          isRead: false,
        },
        { isRead: true },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
