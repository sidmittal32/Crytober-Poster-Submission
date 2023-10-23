import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import crypto from 'crypto';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { uploadFile, deleteFile, getObjectSignedUrl } from './s3.js';
import bodyParser from 'body-parser'; // Import body-parser

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json({ limit: '50mb' })); // Set JSON request body limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000})); // Set URL-encoded request body limit
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
});

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const _dirname = path.dirname('');
const buildPath = path.join(_dirname, '../react/dist');

app.use(express.static(buildPath));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../react/dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/api/posts', async (req, res) => {
  const posts = await prisma.posts.findMany({ orderBy: [{ created: 'desc' }] });
  for (let post of posts) {
    post.imageUrl = await getObjectSignedUrl(post.imageName);
  }
  res.send(posts);
});

app.post('/api/posts', upload.single('image'), async (req, res) => {
  const file = req.file;
  const teamName = req.body.teamName;
  const teamLeaderName = req.body.teamLeaderName;
  const teamLeaderEmail = req.body.teamLeaderEmail;
  const teamLeaderPhone = req.body.teamLeaderPhone;
  const imageName = generateFileName();

  try {
    // Use sharp to resize and optimize the image
    const resizedImageBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: 'contain' })
      .jpeg({ quality: 80, progressive: true }) // Adjust settings as needed
      .toBuffer();

    // Upload the resized image to S3
    await uploadFile(resizedImageBuffer, imageName, 'image/jpeg'); // Specify the correct MIME type

    const post = await prisma.posts.create({
      data: {
        imageName,
        teamName,
        teamLeaderName,
        teamLeaderEmail,
        teamLeaderPhone,
      },
    });

    res.status(201).send(post);
  } catch (error) {
    console.error('Error submitting the form', error);
    res.status(500).send('Error submitting the form');
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const id = +req.params.id;
  const post = await prisma.posts.findUnique({ where: { id } });

  await deleteFile(post.imageName);

  await prisma.posts.delete({ where: { id: post.id } });
  res.send(post);
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
