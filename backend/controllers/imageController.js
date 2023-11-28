import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import multerS3 from 'multer-s3';
import express from 'express';
import dotenv from 'dotenv';
import asyncHandler from '../middleware/asyncHandler.js';

dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET,
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      Date.now() + '_' + file.fieldname + '_' + file.originalname;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: s3Storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

const router = express.Router();

export const getImage = asyncHandler(async (req, res) => {
  const url = req.params.url;

  if (!url) {
    res.status(404);
    throw new Error('Image not found');
    return;
  }

  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: url,
    };

    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.status(200).send({
      message: 'Image url created',
      signedUrl: signedUrl,
    });
  } catch (err) {
    res.status(404);
    throw new Error('Image not found');
  }
});

export const uploadImage = asyncHandler(async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    resize: {
      width: 400,
      height: 400,
    },
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  res.status(200).send({
    message: 'Image uploaded successfully',
    image: {
      url: req.file.key,
      originalname: req.file.originalname,
      format: req.file.mimetype,
    },
  });
});

export default router;
