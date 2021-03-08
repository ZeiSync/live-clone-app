import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    validationSchema
  }), MongooseModule.forRoot('mongodb://localhost:27017/live')],
})
export class AppModule {}
