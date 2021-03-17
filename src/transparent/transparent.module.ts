import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Transparent, TransparentSchema } from './schemas/transparent.schema';
import { TransparentController } from './transparent.controller';
import { TransparentService } from './transparent.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transparent.name, schema: TransparentSchema },
    ]),
    AuthModule,
  ],
  controllers: [TransparentController],
  providers: [TransparentService],
})
export class TransparentModule {}
