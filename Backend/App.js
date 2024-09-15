import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connection } from './Database/Connection.js';
import { errorMiddleware } from './Middleware/ErrorMiddleware.js';
import fileUpload from 'express-fileupload';
import userRouter from './Routes/UserRoute.js';
import jobRouter from './Routes/JobRoute.js';
import applicationRoute from './Routes/ApplicationRoute.js';
import { newsLetterCron } from './Automation/NewsLetterCron.js';

const app = express();
config({path: "./Config/Config.env"})

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',  // Set the temp file directory path. Default is os.tmpdir()
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRoute);

newsLetterCron();
connection();
app.use(errorMiddleware);



export default app;
