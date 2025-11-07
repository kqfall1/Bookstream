import assetRouter from './routers/asset_router.js';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use('src', assetRouter);

export default app; 