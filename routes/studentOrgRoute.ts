// npm
import { Router,  Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimit } from 'express-rate-limit';

// local
import StudentOrgScraper from '../scrape/StudentOrgScraper';
import { StudentOrgDescription, StudentOrgDescriptionCache } from '../utils/types';
import { cacheTimeLimit, SECOND, MINUTE } from '../utils/constants';

let cache: StudentOrgDescriptionCache = {};

const rateLimiter: RateLimit = rateLimit({
    windowMs: 20 * MINUTE,
    max: 200
});

const router: Router = Router();

router.get('/', rateLimiter, async(req: Request, res: Response, next: NextFunction) => {
    const cacheExists: boolean = (cache.payload && cache.timeCached) ? true : false;
    let safeToUseCache: boolean = false;

    if(cacheExists) {
        // if cache exists
        // check if it is safe to use
        safeToUseCache = (cache.timeCached! > Date.now() - cacheTimeLimit);
    }

    if(cacheExists && safeToUseCache) {
        // send cache
        return res.json({
            studentOrgDescriptions: cache.payload,
            timeCached: cache.timeCached
        });
    }

    try {
        const studentOrgScraper: StudentOrgScraper = new StudentOrgScraper();
        const studentOrgDescriptions: StudentOrgDescription[] = await studentOrgScraper.getStudentsOrgDescriptions();

        const timeCached: number = Date.now();
        if(studentOrgDescriptions.length > 0) {
            // reset cache
            cache.payload = studentOrgDescriptions;
            cache.timeCached = timeCached;
        }

        return res.json({
            orgs: studentOrgDescriptions,
            timeCached: timeCached
        });
    }

    catch(error: any) {
        return next(error);
    }
});

export default router;