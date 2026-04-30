setTimeout(extractAndSaveMoodleCourses, 1500);

function extractAndSaveMoodleCourses() {
    chrome.storage.local.get(['savedMoodleCourses'], (result) => {
        const existingCourses = result.savedMoodleCourses || [];
        const courses = document.querySelectorAll('li[data-region="course-content"]');
        const newCourseData = [];

        courses.forEach(course => {
            const linkElement = course.querySelector('a.coursename');
            if (!linkElement) return;

            const url = linkElement.href;
            let rawTitle = linkElement.textContent.replace(/課程名稱\s*/g, '').replace(/課程已做星號標記/g, '').trim();
            
            let name = rawTitle;
            let dept = '台科大課程';
            let courseNum = '';
            let termStr = 'Moodle 課程';

            const match = rawTitle.match(/(?:(\d{3})\.(\d))?\s*【(.*?)】\s*([a-zA-Z0-9_]+)\s+(.*)/);
            if (match) {
                const rocYear = parseInt(match[1]);
                const term = parseInt(match[2]);   
                dept = match[3];                   
                courseNum = match[4];              
                name = match[5];                   

                if (!isNaN(rocYear) && !isNaN(term)) {
                    const gregYear = term === 1 ? rocYear + 1911 : rocYear + 1911 + 1;
                    const season = term === 1 ? 'Fall' : 'Spring';
                    termStr = `${rocYear}-${term} (${gregYear} ${season})`;
                }
            }

            const imageElement = course.querySelector('.list-image');
            let bgImage = '';
            if (imageElement && imageElement.style.backgroundImage) {
                bgImage = imageElement.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            }

            const existingCourse = existingCourses.find(c => c.name === name);
            const links = existingCourse && existingCourse.links ? existingCourse.links : { announcement: '', assignment: '', discussion: '', file: '' };
            const color = existingCourse && existingCourse.color ? existingCourse.color : '#254284';
            const isVisible = existingCourse && existingCourse.isVisible !== undefined ? existingCourse.isVisible : true;

            newCourseData.push({ name, url, bgImage, term: termStr, dept, courseNum, links, color, isVisible });
        });

        if (newCourseData.length > 0) {
            chrome.storage.local.set({ savedMoodleCourses: newCourseData }, () => {
                console.log("Moodle 課程已同步！");
            });
        }
    });
}