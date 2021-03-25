import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransparentModule } from './transparent/transparent.module';
import { EventModule } from './event/event.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    UserModule,
    AuthModule,
    TransparentModule,
    EventModule,
    UploadModule,
  ],
})
export class AppModule {}
