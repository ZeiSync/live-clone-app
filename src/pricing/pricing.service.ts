import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base.service';
import { Pricing, PricingDocument } from './schemas/pricing.schema';

@Injectable()
export class PricingService extends BaseService<PricingDocument> {
  constructor(
    @InjectModel(Pricing.name)
    private pricingModel: Model<PricingDocument>,
  ) {
    super(pricingModel);
  }
}
