import { requireAuth, validateRequest } from '@worth-it/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ImageUploadService } from '../services/uploadImage';

const router = express.Router();
const imageupload = new ImageUploadService();

router.post(
  '/api/annonces/imageupload',

  async (req: Request, res: Response) => {
    try {
      const singleFileUpload = imageupload.upload.single('image');
      singleFileUpload(req, res, function (error: any) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        // @ts-ignore
        return res.status(201).send({ url: req.file.location });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }
);

export { router as imageUploadAnnonceRouter };
