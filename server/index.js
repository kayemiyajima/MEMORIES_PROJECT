import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// just setup the body-parser so that we can properly send pur requests
app.use(cors());
// cors setup to use it properly, should be on the top of all the app.use functions.

app.use('/posts', postRoutes);
// set '/posts' for all the routes inside of the postRoutes, means all the routes inside of the posts starts with /posts

const PORT = process.env.PORT || 5000;
//database setting for mongoDB

//to connecto to our database, with 2 parameters, 2nd parameter onject is not necessary but for not getting error or warning later.
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  //once our app successfully listens, show the message
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);


