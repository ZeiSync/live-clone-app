import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { generateRandomString } from 'src/helper/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = generateRandomString();
  callback(null, `${name}-${randomName}${fileExtName}`);
};
