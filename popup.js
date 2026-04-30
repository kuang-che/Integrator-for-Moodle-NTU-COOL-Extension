// 安全跳脫 HTML 實體
function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const courseListDiv = document.getElementById('course-list');
    const saveBtn = document.getElementById('save-btn');

    document.getElementById('go-moodle-btn')?.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://moodle2.ntust.edu.tw/my/courses.php' });
    });

    document.getElementById('go-github-btn')?.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://github.com/kuang-che/Integrator-for-Moodle-NTU-COOL-Extension' });
    });

    chrome.storage.local.get(['savedMoodleCourses'], (result) => {
        const courses = result.savedMoodleCourses || [];
        
        if (courses.length === 0) {
            courseListDiv.innerHTML = '<p style="text-align:center; color:#999; font-size: 13px;">尚未獲取到課程，請先點擊上方按鈕前往 Moodle。</p>';
            saveBtn.style.display = 'none';
            return;
        }

        courseListDiv.innerHTML = '<h3 class="section-title">2. 自訂顯示、圖標與顏色</h3>';

        courses.forEach((course, index) => {
            const links = course.links || { announcement: '', assignment: '', discussion: '', file: '' };
            const color = course.color || '#254284'; 
            const isVisible = course.isVisible !== false; 
            
            // 跳脫處理
            const safeName = escapeHTML(course.name);
            const safeAnnounce = escapeHTML(links.announcement);
            const safeAssign = escapeHTML(links.assignment);
            const safeDiscuss = escapeHTML(links.discussion);
            const safeFile = escapeHTML(links.file);
            const safeColor = escapeHTML(color);
            
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <h4 class="course-title" title="${safeName}">${safeName}</h4>
                
                <div class="input-group">
                    <label>公告圖標連結：</label>
                    <input type="text" id="announcement-${index}" value="${safeAnnounce}">
                </div>
                <div class="input-group">
                    <label>作業圖標連結：</label>
                    <input type="text" id="assignment-${index}" value="${safeAssign}">
                </div>
                <div class="input-group">
                    <label>討論圖標連結：</label>
                    <input type="text" id="discussion-${index}" value="${safeDiscuss}">
                </div>
                <div class="input-group">
                    <label>文件圖標連結：</label>
                    <input type="text" id="file-${index}" value="${safeFile}">
                </div>
                
                <div class="color-group">
                    <label>課程識別色：</label>
                    <input type="color" id="color-${index}" value="${safeColor}">
                </div>
                
                <div class="visibility-group">
                    <label for="visible-${index}">顯示於 COOL：</label>
                    <input type="checkbox" id="visible-${index}" ${isVisible ? 'checked' : ''}>
                </div>
            `;
            courseListDiv.appendChild(card);
        });
    });

    saveBtn.addEventListener('click', () => {
        chrome.storage.local.get(['savedMoodleCourses'], (result) => {
            const courses = result.savedMoodleCourses || [];
            
            courses.forEach((course, index) => {
                course.links = {
                    announcement: document.getElementById(`announcement-${index}`).value.trim(),
                    assignment: document.getElementById(`assignment-${index}`).value.trim(),
                    discussion: document.getElementById(`discussion-${index}`).value.trim(),
                    file: document.getElementById(`file-${index}`).value.trim()
                };
                course.color = document.getElementById(`color-${index}`).value;
                course.isVisible = document.getElementById(`visible-${index}`).checked;
            });

            chrome.storage.local.set({ savedMoodleCourses: courses }, () => {
                const originalText = saveBtn.textContent;
                saveBtn.textContent = '已儲存！請重新整理 COOL 首頁';
                saveBtn.style.backgroundColor = '#1e7e34'; 
                
                setTimeout(() => { 
                    saveBtn.textContent = originalText; 
                    saveBtn.style.backgroundColor = ''; 
                }, 3000);
            });
        });
    });
});