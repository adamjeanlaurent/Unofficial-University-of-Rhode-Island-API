import { Mode } from 'fs';
import { Model, Schema } from 'mongoose';
import mongoose from '../db/db';
import { CourseDescription, ICourseDescriptionModel } from '../utils/types';

const Course: Schema = new mongoose.Schema({
    name:        { type: String },
    description: { type: String },
    courseCode:  { type: String }
});

const CourseModel = mongoose.model<ICourseDescriptionModel>('course', Course);

export default CourseModel;