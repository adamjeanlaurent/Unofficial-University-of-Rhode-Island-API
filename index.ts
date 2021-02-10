// npm
import {  Express, NextFunction , Request, Response } from 'express';
const express = require('express');
import cors from 'cors';
import helmet from 'helmet';

// local
import courseRouter from './routes/courseRoute';
import studentOrgRouter from './routes/studentOrgRoute';

// setup express
const app: Express = express();
app.enable("trust proxy");

// middleware 
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
app.use('/v1/course', courseRouter);
app.use('/v1/org', studentOrgRouter);

// app listener
app.listen(process.env.PORT || 3000, () => {
    console.log('app Running!');
});