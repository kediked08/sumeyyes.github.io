// Select elements
const diaryTextarea = document.querySelector('#diary-textarea');
const viewEntriesBtn = document.querySelector('#view-entries-btn');
const entriesDiv = document.querySelector('#entries');
const deleteEntriesBtn = document.querySelector('#delete-entries-btn');
const diaryForm = document.querySelector('#diary-form');

// Load saved entries from local storage
let savedEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

// Render saved entries
function renderEntries(entries) {
  let html = '';
  entries.forEach(entry => {
    html += `<p>${entry}</p>`;
  });
  entriesDiv.innerHTML = html;
}

// Save the entry to local storage
function saveEntry(entry) {
  savedEntries.push(entry);
  localStorage.setItem('diaryEntries', JSON.stringify(savedEntries));
}

// Show/Hide Entries button click event listener
viewEntriesBtn.addEventListener('click', () => {
  if (entriesDiv.style.display === 'none' || entriesDiv.style.display === '') {
    entriesDiv.style.display = 'block';
    viewEntriesBtn.textContent = 'Hide Entries';
    deleteEntriesBtn.style.display = 'block';
  } else {
    entriesDiv.style.display = 'none';
    viewEntriesBtn.textContent = 'View Entries';
    deleteEntriesBtn.style.display = 'none';
  }
});

// Delete All Entries button click event listener
deleteEntriesBtn.addEventListener('click', () => {
  savedEntries = [];
  localStorage.removeItem('diaryEntries');
  renderEntries(savedEntries);
});

// Diary form submit event listener
diaryForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const entry = diaryTextarea.value;
  if (!entry) return;

  saveEntry(entry);
  renderEntries([entry]);
  diaryTextarea.value = '';
});

// Render saved entries
renderEntries(savedEntries);