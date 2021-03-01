// npm
import dotenv from 'dotenv';
dotenv.config({ path:'../env' });

// local
import { CourseDescription, StudentOrgDescription } from '../utils/types';
import CourseModel from '../models/course';
import OrgModel from '../models/org';
import CourseScraper from '../scrape/CourseScraper';
import StudentOrgScraper from '../scrape/StudentOrgScraper';

async function insertAllData() {
    // test that data can be scraped 
    const studentOrgScraper: StudentOrgScraper = new StudentOrgScraper();
    const studentOrgs: Array<StudentOrgDescription> = await studentOrgScraper.getStudentsOrgDescriptions();

    const courseScraper: CourseScraper = new CourseScraper();
    const courses: Array<CourseDescription> = await courseScraper.getCourseDescriptions();

    if(courses.length === 0 || studentOrgs.length === 0) {
        console.log('data could not be scraped \n db not cleared to prevent data loss😬');
        return;
    }
    
    await clearDB();
    await insertOrgData();
    await insertCourseData();
    console.log('db successfully loaded 😇');
}

async function clearDB() {
    await OrgModel.deleteMany();
    await CourseModel.deleteMany();
}

async function insertOrgData() {
    const studentOrgScraper: StudentOrgScraper = new StudentOrgScraper();
    const studentOrgs: Array<StudentOrgDescription> = await studentOrgScraper.getStudentsOrgDescriptions();

    for(let org of studentOrgs) {
        const newStudentOrg = new OrgModel({
            name: org.name,
            president: org.president,
            phone: org.phone,
            email: org.email,
            logoURL: org.logoURL,
            webiste: org.website,
            description: org.description,
            events: org.events,
            location: org.location,
            graduate: org.graduate,
            recognized: org.recognized,
            other: org.other,
            category: org.category
        });
        
        newStudentOrg.save();
    }
    return;
}

async function insertCourseData() {
    const courseScraper: CourseScraper = new CourseScraper();
    const courses: Array<CourseDescription> = await courseScraper.getCourseDescriptions();
    
    for(let course of courses) {
        const newCourse = new CourseModel({
            name: course.title,
            description: course.description,
            courseCode: course.courseCode
        });

        newCourse.save();
    }
    return;
}

insertAllData();