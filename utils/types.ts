import { Document } from 'mongoose';

export interface CourseDescription {
    title: string;
    description: string;
    courseCode: string;
};

export interface StudentOrgDescription {
    name?: string;
    president?: string;
    phone?: string;
    email?: string;
    logoURL?: string;
    website?: string;
    description?: string;
    events?: string;
    location?: string;
    graduate?: boolean;
    recognized?: boolean;
    other?: string;
    category?: string
};

export interface ICourseDescriptionModel extends CourseDescription, Document {}
export interface IStudentOrgDescriptionModel extends StudentOrgDescription, Document {}

export interface CourseDescriptionCache {
    payload: Map<string, CourseDescription[]>;
    timeCached: Map<string, number>;
};

export interface StudentOrgDescriptionCache {
    payload?: StudentOrgDescription[];
    timeCached?: number;
};