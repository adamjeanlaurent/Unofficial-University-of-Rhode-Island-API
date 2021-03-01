// npm
import { chromium, ChromiumBrowser, Page } from 'playwright-chromium';

// local
import { courseCatalogURL, courseCodes, SECOND } from '../utils/constants';
import { CourseDescription } from '../utils/types';

export default class CourseScraper {
    private browser: ChromiumBrowser;
    private page: Page;
    
    // initializes browser and page instances
    private async init(): Promise<void> {
        this.browser = await chromium.launch({ chromiumSandbox: false });
        this.page = await this.browser.newPage();
        await this.page.goto(courseCatalogURL);
    }
    
    async getCourseDescriptions(courseCode?: string): Promise<CourseDescription[]> {
        await this.init();
        
        if(courseCode) {
             // select single course from dropdown
            await this.page.selectOption('#selectCourse', { label: courseCodes.get(courseCode) });
        }
        
        // click search button
        await this.page.click('#clickSearch');
        // wait 2 seconds for page to load
        await this.page.waitForTimeout(2 * SECOND);
        
        // scrape course titles and descriptions
        const courseDescriptions: CourseDescription[] = await this.page.$$eval('.showResult', (results) => {
            return results.map((result) => {
                const title: string = result.querySelector('.showTitle')?.querySelector('b')?.textContent!;
                const description: string = result.querySelector('.showDescription')?.textContent!;
                const courseDescription: CourseDescription = { 
                    title: title, 
                    description: description,
                    courseCode: title.substring(0,3)
                };
                return courseDescription;
            });
        });
        await this.browser.close();
        
        return courseDescriptions;
    }
};