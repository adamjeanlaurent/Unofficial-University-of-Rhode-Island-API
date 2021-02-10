// npm
import {  Express, NextFunction , Request, Response } from 'express';
const express = require('express');
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from "dotenv";

// local
import courseRouter from './routes/courseRoute';
import studentOrgRouter from './routes/studentOrgRoute';

// setup express
const app: Express = express();
app.enable("trust proxy");
dotenv.config({ path: '../.env' });

// middleware 
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    if(process.env.NODE_ENV == 'production') {
        return res.json({
            error: 'Error Occured 🥞'
        });
    }
    
    return res.json({
        error: error.stack
    });
});

// routes
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/org', studentOrgRouter);

// app listener
app.listen(process.env.PORT || 3000, () => {
    console.log('Running!');
});