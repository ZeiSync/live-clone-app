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
  }), MongooseModule.forRoot(process.env.MONGO_URI)],
})
export class AppModule {}
