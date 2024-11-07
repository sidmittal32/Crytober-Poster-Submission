# Cryptober Poster Submission

A poster submission platform developed for Cryptober, an October cybersecurity awareness initiative by Cryptonite. This platform enables users to submit their cybersecurity awareness posters for review, making it easier to raise awareness during Cybersecurity Awareness Month.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Project Overview
Cryptober Poster Submission is a web application designed to streamline the submission and management of cybersecurity awareness posters. Users can upload their posters, which are stored securely on AWS S3, and submissions are managed with a Prisma-powered database for efficient tracking and administration. This project supports Cryptober’s mission of promoting cybersecurity awareness through visual, impactful posters.

## Features
- **Poster Submission Form**: Users can submit their posters directly through a simple form.
- **Secure Storage**: Uploaded posters are stored in AWS S3 for reliability and scalability.
- **Database Integration**: Uses Prisma ORM with a relational database to manage poster submissions.
- **Error Handling**: Validates submissions to ensure compliance with platform requirements.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: Prisma ORM with PostgreSQL
- **File Storage**: AWS S3 for secure and scalable file storage
- **Hosting**: AWS EC2

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sidmittal32/Crytober-Poster-Submission.git
   cd Crytober-Poster-Submission
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**  
   Create a `.env` file in the root directory with the following variables:
   ```plaintext
   DATABASE_URL=your_database_url
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_BUCKET_NAME=your_s3_bucket_name
   AWS_REGION=your_aws_region
   ```

4. **Run Prisma Migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the Application**
   ```bash
   npm start
   ```

6. **Access the Application**  
   Open your browser and navigate to `http://localhost:3000` (or whichever port is configured).

## Usage
1. **Submit a Poster**: Fill out the submission form, attaching your cybersecurity awareness poster.
2. **Admin Review**: Submitted posters are stored in AWS S3, with entry details stored in a relational database managed by Prisma.
3. **Moderation**: (If applicable, describe any admin features for reviewing or managing submissions.)
