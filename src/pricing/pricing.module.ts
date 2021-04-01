import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Pricing, PricingSchema } from './schemas/pricing.schema';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pricing.name, schema: PricingSchema }]),
    AuthModule,
  ],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
