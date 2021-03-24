import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const {
  parsed: { CLOUDNAME, APIKEY, APISECRET },
} = dotenv.config();

@Injectable()
export class UploadService {
  async uploadCloundinary(file: Express.Multer.File): Promise<string> {
    cloudinary.v2.config({
      cloud_name: CLOUDNAME,
      api_key: APIKEY,
      api_secret: APISECRET,
    });

    const uniqueFilename = new Date().toISOString();
    try {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        public_id: `thumbnails/${uniqueFilename}`,
        tags: `thumbnail`,
      });
      fs.unlinkSync(file.path);
      return result.secure_url;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
