# Unofficial University Of Rhode Island API
- This is a free unofficial API for University Of Rhode Island course and student org data (and maybe more coming 🙂 ).
- Data is scraped from official University Of Rhode Island websites.

## Usage

# GET - /v1/course/:courseCode?
- Returns course names and descriptions.
- If courseCode paramater is set, for example as CSC, then all CSC classes only will be returned. - Otherwise if courseCode is not set, then all 4000~ courses offered at the University are returned. 
- Valid input for courseCode is 3 letter course codes, example, CSC, TMD, STA, MTH, COM, etc.
- Data is scraped from the [official URI course catalog](https://web.uri.edu/catalog/course-descriptions/).

```javascript
// Example Usage With JavaScript:
// *You can call the API with any language of your choice of course*

// get all CSC courses
const response = await fetch('https://unofficial-uri-api.herokuapp.com/v1/course/CSC');
const allCSCcourses = await response.json();
console.log(allCSCcourses);

// get all URI courses
const response = await fetch('https://unofficial-uri-api.herokuapp.com/v1/course');
const allURICourses = await response.json();
console.log(allURICourses);
```

```json
// example response
{
  "courses": [
    {
      "title": "CSC 101: Computing Concepts",
      "description": "LEC: (4 crs.) Capabilities and limitations of computers. Applications of computers in today's society. Overview of computing systems and programs. Students will complete several projects using a computer. (Lec. 3, Lab. 2/Online) Not open to students who have credit in any college-level computer science course, or to computer science majors. (B3) (B4)",
      "courseCode": "CSC"
    },
    {
      "title": "CSC 104: Puzzles + Games = Analytical Thinking",
      "description": "LEC: (4 crs.) Cross-listed as (CSC), MTH 104. Introduces mathematical problem solving and computational thinking through puzzles and games. Students work in small groups on activities to enhance their analytic abilities. Topics include numbers, probability, logic, algorithms, and graphs. (Lec. 4) Pre: High school mathematics. No programming required. (B3)",
      "courseCode": "CSC"
    },
    .......... more courses
  ],
  "timeCached": 1612918010918
} 
```


# GET - /v1/org
- Returns list of all student orgs on campus, with information about each one such as name, location, description, email, phone number, etc. 
- Data is scraped from the [official student organization list](https://studentorg.apps.uri.edu/).
```javascript
// Example Usage With JavaScript:
// *You can call the API with any language of your choice of course*

const response = await fetch('https://unofficial-uri-api.herokuapp.com/v1/org');
const studentOrgs = await response.json();
console.log(studentOrgs);
```
```json
// Example Response:
{
"orgs": [
    {
      "name": "193 Student Coffeehouse",
      "president": "Natalie Bernier, Arden Bastia",
      "phone": "000-000-0000",
      "email": "193.employees@gmail.com",
      "description": "An all student run collective coffeehouse that serves fair trade coffee, tea, and other specialty drinks in a fun, inviting atmosphere! We host open mics, band nights, and movie nights. Follow us on Instagram to stay up to date with events (@193coffeehouse)!",
      "location": "Memorial Union Room 200",
      "graduate": false,
      "recognized": false,
      "other": "Last Updated October 2019",
      "category": "Creative Outlets"
    },
    .......... more orgs
  ],
   "timeCached": 1612918010918 
 }
```

