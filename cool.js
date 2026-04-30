const SVG_PATHS = {
    announcement: "M1587.162 31.278c11.52-23.491 37.27-35.689 63.473-29.816 25.525 6.099 43.483 28.8 43.483 55.002V570.46C1822.87 596.662 1920 710.733 1920 847.053c0 136.32-97.13 250.503-225.882 276.705v513.883c0 26.202-17.958 49.016-43.483 55.002a57.279 57.279 0 0 1-12.988 1.468c-21.12 0-40.772-11.745-50.485-31.171C1379.238 1247.203 964.18 1242.347 960 1242.347H564.706v564.706h87.755c-11.859-90.127-17.506-247.003 63.473-350.683 52.405-67.087 129.657-101.082 229.948-101.082v112.941c-64.49 0-110.57 18.861-140.837 57.487-68.781 87.868-45.064 263.83-30.269 324.254 4.18 16.828.34 34.673-10.277 48.34-10.73 13.665-27.219 21.684-44.499 21.684H508.235c-31.171 0-56.47-25.186-56.47-56.47v-621.177h-56.47c-155.747 0-282.354-126.607-282.354-282.353v-56.47h-56.47C25.299 903.523 0 878.336 0 847.052c0-31.172 25.299-56.471 56.47-56.471h56.471v-56.47c0-155.634 126.607-282.354 282.353-282.354h564.593c16.941-.112 420.48-7.002 627.275-420.48Zm-5.986 218.429c-194.71 242.371-452.216 298.164-564.705 311.04v572.724c112.489 12.876 369.995 68.556 564.705 311.04ZM903.53 564.7H395.294c-93.402 0-169.412 76.01-169.412 169.411v225.883c0 93.402 76.01 169.412 169.412 169.412H903.53V564.7Zm790.589 123.444v317.93c65.618-23.379 112.94-85.497 112.94-159.021 0-73.525-47.322-135.53-112.94-158.909Z",
    assignment: "M1468.214 0v564.698h-112.94V112.94H112.94v1694.092h1242.334v-225.879h112.94v338.819H0V0h1468.214Zm129.428 581.311c22.137-22.136 57.825-22.136 79.962 0l225.879 225.879c22.023 22.023 22.023 57.712 0 79.848l-677.638 677.637c-10.616 10.504-24.96 16.49-39.98 16.49h-225.88c-31.17 0-56.469-25.299-56.469-56.47v-225.88c0-15.02 5.986-29.364 16.49-39.867Zm-155.291 314.988-425.895 425.895v146.031h146.03l425.895-425.895-146.03-146.03Zm-764.714 346.047v112.94H338.82v-112.94h338.818Zm225.88-225.88v112.94H338.818v-112.94h564.697Zm734.106-315.44-115.424 115.425 146.03 146.03 115.425-115.423-146.031-146.031ZM1129.395 338.83v451.758H338.82V338.83h790.576Zm-112.94 112.94H451.759v225.878h564.698V451.77Z",
    discussion: "M677.647 16v338.936h112.941V129.054h1016.47V919.53h-225.994v259.765L1321.412 919.53h-79.172V467.878H0v1016.47h338.71v418.9l417.996-418.9h485.534v-451.877h32.753l419.125 419.124v-419.124H1920V16H677.647ZM338.79 919.563h564.706v-112.94H338.79v112.94Zm0 225.883h338.936v-113.054H338.79v113.054Zm-225.85-564.74h1016.47v790.701H710.4L451.652 1631.06v-259.652h-338.71V580.706Z",
    file: "M1807.059 1637.706c0 31.172-25.412 56.47-56.47 56.47H169.411c-31.06 0-56.47-25.298-56.47-56.47V225.94h590.907L854.4 451.824H225.882v112.94H1807.06v1072.942ZM990.269 451.824 764.385 113H0v1524.706c0 93.402 76.01 169.412 169.412 169.412h1581.176c93.403 0 169.412-76.01 169.412-169.412V451.824H990.268Z"
};

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

function generateIconHTML(type, url, courseName) {
    if (!url) return '';
    const titleMap = { announcement: '公告', assignment: '作業', discussion: '討論', file: '文件' };
    const title = titleMap[type];
    const safeUrl = escapeHTML(url);
    const safeName = escapeHTML(courseName);
    
    return `
        <a href="${safeUrl}" target="_blank" class="ic-DashboardCard__action ${type}s" title="${title} - ${safeName}">
            <span class="screenreader-only">${title} - ${safeName}</span>
            <div class="ic-DashboardCard__action-layout">
                <svg viewBox="0 0 1920 1920" width="1em" height="1em" aria-hidden="true" focusable="false" class="css-5sj4z-inlineSVG-svgIcon" style="width: 1em; height: 1em;">
                    <g role="presentation"><path d="${SVG_PATHS[type]}" fill-rule="evenodd"></path></g>
                </svg>
            </div>
        </a>
    `;
}

function updateCourseCount() {
    document.querySelectorAll('.ic-DashboardCard__box').forEach(box => {
        const headerSpan = box.querySelector('.ic-DashboardCard__box__header span');
        const container = box.querySelector('.ic-DashboardCard__box__container');
        
        if (headerSpan && container) {
            const totalCards = container.querySelectorAll('.ic-DashboardCard').length;
            headerSpan.textContent = headerSpan.textContent.replace(/\d+/, totalCards);
        }
    });
}

let isInjectingCards = false; 
function injectMoodleCards() {
    const container = document.querySelector('.ic-DashboardCard__box__container');
    if (!container || document.querySelector('.moodle-injected-card') || isInjectingCards) return; 

    isInjectingCards = true;

    chrome.storage.local.get(['savedMoodleCourses'], (result) => {
        if (document.querySelector('.moodle-injected-card') || !result.savedMoodleCourses?.length) {
            isInjectingCards = false; 
            return;
        }

        result.savedMoodleCourses.filter(c => c.isVisible !== false).forEach(course => {
            const subtitle = `[台科大] ${course.dept}${course.courseNum ? ` (${course.courseNum})` : ''}`;
            const safeName = escapeHTML(course.name);
            const safeSubtitle = escapeHTML(subtitle);
            const safeUrl = escapeHTML(course.url);
            const safeTerm = escapeHTML(course.term);
            const safeColor = escapeHTML(course.color || '#254284');
            const safeBgImage = escapeHTML(course.bgImage).replace(/'/g, "%27");
            const links = course.links || {};
            
            const actionIcons = ['announcement', 'assignment', 'discussion', 'file']
                .map(type => generateIconHTML(type, links[type], course.name))
                .join('');

            container.insertAdjacentHTML('beforeend', `
                <div class="ic-DashboardCard moodle-injected-card" aria-label="${safeName}" style="opacity: 1;">
                    <div class="ic-DashboardCard__header">
                        <a href="${safeUrl}" target="_blank" class="ic-DashboardCard__header_image" style="background-image: url('${safeBgImage}'); display: block; text-decoration: none;">
                            <div class="ic-DashboardCard__header_hero" aria-hidden="true" style="background-color: ${safeColor}; opacity: 0.6;"></div>
                        </a>
                        <a href="${safeUrl}" class="ic-DashboardCard__link" target="_blank">
                            <div class="ic-DashboardCard__header_content">
                                <h3 class="ic-DashboardCard__header-title ellipsis" title="${safeName}">
                                    <span style="color: ${safeColor};">${safeName}</span>
                                </h3>
                                <div class="ic-DashboardCard__header-subtitle ellipsis" title="${safeSubtitle}">${safeSubtitle}</div>
                                <div class="ic-DashboardCard__header-term ellipsis" title="${safeTerm}">${safeTerm}</div>
                            </div>
                        </a>
                    </div>
                    <nav class="ic-DashboardCard__action-container" aria-label="${safeName} 的動作">
                        ${actionIcons}
                    </nav>
                </div>
            `);
        });
        
        updateCourseCount();
        isInjectingCards = false;
    });
}

let isInjectingList = false;
function injectMoodleList() {
    const tbody = document.querySelector('table#my_courses_table tbody');
    if (!tbody || document.querySelector('.moodle-injected-list-item') || isInjectingList) return;

    isInjectingList = true;

    chrome.storage.local.get(['savedMoodleCourses'], (result) => {
        if (document.querySelector('.moodle-injected-list-item') || !result.savedMoodleCourses?.length) {
            isInjectingList = false; 
            return;
        }

        result.savedMoodleCourses.forEach(course => {
            const safeName = escapeHTML(course.name);
            const safeUrl = escapeHTML(course.url);
            const safeTerm = escapeHTML(course.term);
            const safeColor = escapeHTML(course.color || '#254284');

            tbody.insertAdjacentHTML('beforeend', `
                <tr class="course-list-table-row moodle-injected-list-item">
                    <td class="course-list-star-column">
                        <span class="course-list-favoritable" data-tooltip="bottom" title="請至擴充功能設定顯示或隱藏" style="cursor: not-allowed; opacity: 0.3;">
                            <i class="course-list-favorite-icon icon-star-light"></i>
                        </span>
                    </td>
                    <td class="course-list-course-title-column course-list-no-left-border">
                        <span aria-hidden="true" class="course-color-block" style="color: ${safeColor};"></span>
                        <a href="${safeUrl}" title="${safeName}" target="_blank">
                            <span class="name">${safeName}</span>
                        </a>
                    </td>
                    <td class="course-list-no-left-border course-list-nickname-column"></td>
                    <td class="course-list-no-left-border course-list-term-column">${safeTerm}</td>
                    <td class="course-list-no-left-border course-list-enrolled-as-column">學生</td>
                    <td class="course-list-no-left-border course-list-published-column">
                        <span data-tooltip="" title="本課程已經公佈。">是</span>
                    </td>
                </tr>
            `);
        });

        isInjectingList = false;
    });
}

let isInjectingTray = false;
function injectMoodleTray() {
    const trayDialog = document.querySelector('div[aria-label="課程收集箱"]') || document.querySelector('div[aria-label="Courses tray"]');
    if (!trayDialog) return; 

    const isEnglish = document.documentElement.lang.startsWith('en');
    const termLabel = isEnglish ? 'Term: ' : '學期：';

    const uls = trayDialog.querySelectorAll('ul.css-1t5l7tc-view--block-list');
    if (uls.length < 2) return;
    
    const courseListUl = uls[1]; 
    if (courseListUl.querySelector('.moodle-injected-tray-item') || isInjectingTray) return;
    
    isInjectingTray = true;

    chrome.storage.local.get(['savedMoodleCourses'], (result) => {
        if (courseListUl.querySelector('.moodle-injected-tray-item') || !result.savedMoodleCourses?.length) {
            isInjectingTray = false; 
            return;
        }

        result.savedMoodleCourses.filter(c => c.isVisible !== false).forEach(course => {
            const subtitle = `[台科大] ${course.dept}${course.courseNum ? ` (${course.courseNum})` : ''}`;
            const safeName = escapeHTML(course.name);
            const safeSubtitle = escapeHTML(subtitle);
            const safeUrl = escapeHTML(course.url);
            const safeTerm = escapeHTML(course.term);

            courseListUl.insertAdjacentHTML('beforeend', `
                <li dir="ltr" class="css-1be2kin-view-listItem moodle-injected-tray-item">
                    <a dir="ltr" href="${safeUrl}" target="_blank" class="css-xytg3h-view-link">${safeName}</a>
                    <div wrap="normal" letter-spacing="normal" class="css-1sr6v3o-text">${safeSubtitle}</div>
                    <div wrap="normal" letter-spacing="normal" class="css-1sr6v3o-text">${termLabel}${safeTerm}</div>
                </li>
            `);
        });

        isInjectingTray = false;
    });
}

let isInjectingMobileMenu = false;
function injectMoodleMobileMenu() {
    const coursesLinks = document.querySelectorAll('a[href="/courses"]');
    let targetUl = null;
    
    for (const link of coursesLinks) {
        const ul = link.closest('ul');
        if (ul && link.closest('[id^="Expandable_"]')) {
            targetUl = ul;
            break;
        }
    }

    if (!targetUl || targetUl.querySelector('.moodle-injected-mobile-item') || isInjectingMobileMenu) return;
    
    isInjectingMobileMenu = true;

    chrome.storage.local.get(['savedMoodleCourses'], (result) => {
        if (targetUl.querySelector('.moodle-injected-mobile-item') || !result.savedMoodleCourses?.length) {
            isInjectingMobileMenu = false; 
            return;
        }

        result.savedMoodleCourses.filter(c => c.isVisible !== false).forEach(course => {
            const safeName = escapeHTML(course.name);
            const safeUrl = escapeHTML(course.url);
            const safeTerm = escapeHTML(course.term);

            targetUl.insertAdjacentHTML('beforeend', `
                <li dir="ltr" class="css-1be2kin-view-listItem moodle-injected-mobile-item">
                    <a dir="ltr" href="${safeUrl}" target="_blank" class="css-1v9hmy6-view--block-link">
                        ${safeName}
                        <div wrap="normal" letter-spacing="normal" class="css-1sr6v3o-text">${safeTerm}</div>
                    </a>
                </li>
            `);
        });

        isInjectingMobileMenu = false;
    });
}

function checkAndInject() {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
        injectMoodleCards();
    } else if (path === '/courses' || path === '/courses/') {
        injectMoodleList();
    }
    injectMoodleTray();
    injectMoodleMobileMenu();
}

checkAndInject(); 

new MutationObserver(checkAndInject).observe(document.body, {
    childList: true,
    subtree: true
});