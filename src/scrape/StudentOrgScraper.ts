// npm
import { chromium, ChromiumBrowser, Page } from 'playwright'

// local
import { 
    SECOND, 
    studentOrgsCatalogURL
} from '../utils/constants';

import { StudentOrgDescription } from '../utils/types';

export default class StudentOrgScraper {
    private browser: ChromiumBrowser;
    private page: Page;

      // initializes browser and page instances
    private async init(): Promise<void> {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
        await this.page.goto(studentOrgsCatalogURL);
    }

    async getStudentsOrgDescriptions(): Promise<StudentOrgDescription[]> {
        await this.init();
        
        const studentOrgsDescriptions: StudentOrgDescription[] = await this.page.$$eval('.AccordionPanelContent', (panelContents) => {
            return panelContents.map((panelContent) => {
                let studentOrgDescription: StudentOrgDescription = {
                    name: '',
                    president: '',
                    phone: '',
                    email: '',
                    logoURL: '',
                    website: '',
                    description: '',
                    events: '',
                    location: '',
                    graduate: false,
                    recognized: false,
                    other: '',
                    category: ''
                };
                const tableRows = panelContent.querySelectorAll('tr');
                for(let tableRow of tableRows) {                
                    const tableRowData = tableRow.querySelectorAll('td');
                    const category: string = tableRowData[0]?.querySelector('strong')?.textContent?.trim()!;
                    let value: string = tableRowData[1]?.textContent?.trim()!;
                    // value = value.replace(/(\r\n|\n|\r)/gm,"");
    
                    if(category === 'Org Name:')            studentOrgDescription.name = value;
                    else if(category === 'Org President:')  studentOrgDescription.president = value;
                    else if(category === 'Phone:')          studentOrgDescription.phone = value;
                    else if(category === 'Email:')          studentOrgDescription.email = value;
                    else if(category === 'Website:')        studentOrgDescription.website = value;
                    else if(category === 'Description:')    studentOrgDescription.description = value;
                    else if(category === 'Events:')         studentOrgDescription.events = value;
                    else if(category === 'Location:')       studentOrgDescription.location = value;
                    else if(category === 'Graduate Org:')   studentOrgDescription.graduate = (value === 'No' ? false : true);
                    else if(category === 'Recognized Org:') studentOrgDescription.recognized = (value === 'No' ? false : true);
                    else if(category === 'Category:')       studentOrgDescription.category = value;
                    else if(category === 'Other:')          studentOrgDescription.other = value;
                }
                return studentOrgDescription;
            });
        });

        await this.browser.close();
        return studentOrgsDescriptions;
    }
};