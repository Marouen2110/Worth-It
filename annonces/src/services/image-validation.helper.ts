import { BadRequestError } from '@worth-it/common';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

export const imageFilter = function (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    // req.fileValidationError = 'Only image files are allowed!';
    return callback(
      new BadRequestError(
        'Method accespts only images [jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF]'
      )
    );
  }
  callback(null, true);
};
