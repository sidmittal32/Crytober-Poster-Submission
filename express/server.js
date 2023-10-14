import express from 'express'

import multer from 'multer'
import sharp from 'sharp'
import crypto from 'crypto'

import path from 'path';

import { PrismaClient } from '@prisma/client'
import { uploadFile, deleteFile, getObjectSignedUrl } from './s3.js'

const app = express()
const prisma = new PrismaClient()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../react/dist");

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../react/dist/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

app.get("/api/posts", async (req, res) => {
  const posts = await prisma.posts.findMany({orderBy: [{ created: 'desc'}]})
  for (let post of posts) {
    post.imageUrl = await getObjectSignedUrl(post.imageName)
  }
  res.send(posts)
})


app.post('/api/posts', upload.single('image'), async (req, res) => {
  const file = req.file
  //const caption = req.body.caption
  const teamName = req.body.teamName
  const teamLeaderName = req.body.teamLeaderName
  const teamLeaderEmail = req.body.teamLeaderEmail
  const teamLeaderPhone = req.body.teamLeaderPhone
  const imageName = generateFileName()

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer()

  await uploadFile(fileBuffer, imageName, file.mimetype)

  const post = await prisma.posts.create({
    data: {
      imageName,
      //caption,
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderPhone,
    }
  })
  
  res.status(201).send(post)
})

app.delete("/api/posts/:id", async (req, res) => {
  const id = +req.params.id
  const post = await prisma.posts.findUnique({where: {id}}) 

  await deleteFile(post.imageName)

  await prisma.posts.delete({where: {id: post.id}})
  res.send(post)
})

app.listen(8080, () => console.log("listening on port 8080"))