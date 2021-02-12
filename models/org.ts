import { Model, Schema } from 'mongoose';
import mongoose from '../db/db';
import { StudentOrgDescription, IStudentOrgDescriptionModel } from '../utils/types';

const Org: Schema = new mongoose.Schema({
        name:        { type: String },
        president:   { type: String },
        phone:       { type: String },
        email:       { type: String },
        logoURL:     { type: String },
        website:     { type: String },
        description: { type: String },
        events:      { type: String },
        location:    { type: String },
        graduate:    { type: Boolean },
        recognized:  { type: Boolean },
        other:       { type: String },
        category:    { type: String }
});

const OrgModel = mongoose.model<IStudentOrgDescriptionModel>('org', Org);

export default OrgModel;