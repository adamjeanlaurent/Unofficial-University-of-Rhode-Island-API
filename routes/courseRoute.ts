// npm
import { Router,  Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimit } from 'express-rate-limit';

// local
import { CourseDescription, CourseDescriptionCache } from '../utils/types';
import { courseCodes, cacheTimeLimit, SECOND, MINUTE } from '../utils/constants';
import CourseModel from '../models/course';

let cache: CourseDescriptionCache = { payload: new Map<string, CourseDescription[]>(), timeCached: new Map<string, number>() };

const rateLimiter: RateLimit = rateLimit({
    windowMs: 20 * MINUTE,
    max: 200
});

const router: Router = Router();

router.get('/:courseCode?', rateLimiter, async (req: Request, res: Response, next: NextFunction) => {
    const courseCode: string = req.params.courseCode?.toUpperCase() || '';
    
    // check for valid course code
    if(courseCode !== '' && !courseCodes.get(courseCode)) {
        return res.json({
            error: 'Invalid course code'
        });
    }
    
    // check that cache exists for course code
    const cacheExists: boolean = (courseCode === '') ? cache.payload.has('full') : cache.payload.has(courseCode);
    let safeToUseCache: boolean = false;

    // if cache exists
    // check to see if if the last time it was cached falls into the window that it is safe to use this cache
    // or that we need to re-cache it
    if(cacheExists) {
        safeToUseCache = (courseCode === '') 
            ? cache.timeCached.get('full')! > Date.now() - cacheTimeLimit
            : cache.timeCached.get(courseCode)! > Date.now() - cacheTimeLimit
    }
    
    // check cache  
    if(cacheExists && safeToUseCache) {
        // not time to re-cache yet
        // send cached data
        if(courseCode === '') return res.json({
            courses: cache.payload.get('full'),
            timeCached: cache.timeCached.get('full')
        });
        else return res.json({
            courses: cache.payload.get(courseCode),
            timeCached: cache.timeCached.get(courseCode)
        });
    }
    
    try {
        let courseDescriptions: CourseDescription[] = [];
        
        if(courseCode === '') {
            courseDescriptions = await CourseModel.find({});
        } 
        
        else {
            courseDescriptions = await CourseModel.find({ courseCode: courseCode });
        }

        let timeCached: number = Date.now();

        // reset cache
        if(courseDescriptions.length > 0) {
            if(courseCode === '') {
                cache.payload.set('full', courseDescriptions);
                cache.timeCached.set('full', timeCached);
            } 
            else{
                cache.payload.set(courseCode, courseDescriptions);
                cache.timeCached.set(courseCode, timeCached);
            } 
        }
        
        return res.json({ 
            courses: courseDescriptions,
            timeCached: timeCached
        });
    }
    
    catch(error: any) {
        return next(error);
    }
});

export default router;