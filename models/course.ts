import { Model, Schema } from 'mongoose';
import mongoose from '../db/db';
import { ICourseDescriptionModel } from '../utils/types';

const Course: Schema = new mongoose.Schema({
    name:        { type: String },
    description: { type: String },
    courseCode:  { type: String }
});

const CourseModel: Model<ICourseDescriptionModel> = mongoose.model<ICourseDescriptionModel>('course', Course);

export default CourseModel;