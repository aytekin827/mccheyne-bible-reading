const bibleReadingPlan = {
    "en": {
        "01-01": ["Genesis 1", "Matthew 1", "Ezra 1", "Acts 1"],
        // Add more dates and verses here...
    },
    "ko": {
        "01-01": ["창세기 1장", "마태복음 1장", "에스라 1장", "사도행전 1장"],
        // Add more dates and verses here...
    },
    "tr": {
        "01-01": ["Yaratılış 1", "Matta 1", "Ezra 1", "Elçilerin İşleri 1"],
        // Add more dates and verses here...
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.getElementById('languageSelect');
    const bibleVersesDiv = document.getElementById('bibleVerses');
    const markAsReadButton = document.getElementById('markAsRead');
    const readStatusDiv = document.getElementById('readStatus');

    const today = new Date();
    const todayKey = today.toISOString().slice(5, 10); // MM-DD format

    // Load language from localStorage or default to English
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelect.value = savedLanguage;

    // Load the Bible verses for the selected language and date
    function loadVerses() {
        const selectedLanguage = languageSelect.value;
        const verses = bibleReadingPlan[selectedLanguage][todayKey] || ["No verses available for today"];
        bibleVersesDiv.innerHTML = verses.map(verse => `<p>${verse}</p>`).join('');
    }

    // Mark as read
    markAsReadButton.addEventListener('click', function () {
        localStorage.setItem(`read_${todayKey}`, 'true');
        updateReadStatus();
    });

    // Update read status
    function updateReadStatus() {
        const isRead = localStorage.getItem(`read_${todayKey}`) === 'true';
        readStatusDiv.textContent = isRead ? "You've read today's verses." : '';
    }

    // Reset storage on January 1st
    if (todayKey === '01-01') {
        localStorage.clear();
    }

    // Language selection
    languageSelect.addEventListener('change', function () {
        localStorage.setItem('selectedLanguage', languageSelect.value);
        loadVerses();
    });

    // Initial load
    loadVerses();
    updateReadStatus();
});
