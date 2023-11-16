import AWS from 'aws-sdk';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import express from 'express';
import dotenv from 'dotenv';

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

const upload = multer({
  storage: s3Storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  res.status(200).send({
    message: 'Image uploaded successfully',
    image: {
      url: req.file.key,
      originalname: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    },
  });
});

export default router;
