import dotenv from 'dotenv';
import multer from 'multer';
import * as AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import express, { Express, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { imageFilter } from './image-validation.helper';

const AWS_S3_BUCKET_NAME = 'worth-it.dev';
// const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

interface FileAWS extends Express.Multer.File {
  location: string;
}

export class ImageUploadService {
  constructor() {}
  async fileupload(req: Request, res: Response) {
    try {
      const singleFileUpload = this.upload.single('image');
      singleFileUpload(req, res, function (error: any) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).send({ url: req.file.path });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    limits: {
      fileSize: 1048576 * 2, //2MB
    },
    fileFilter: imageFilter,
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      cacheControl: 'max-age=31536000',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (
        request: Request,
        file: FileAWS,
        cb: (err: any, mime: {}) => void
      ) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (
        request: Request,
        file: FileAWS,
        cb: (err: any, mime: string) => void
      ) {
        cb(
          null,
          `worth-it-annonce-images/${Date.now().toString()} - ${uuid()}-${
            file.originalname
          }`
        );
      },
    }),
  });
}
