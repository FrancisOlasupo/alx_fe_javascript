// Array to hold quotes
let quotes = [];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');
const exportQuotesButton = document.getElementById('exportQuotes');
const importFileInput = document.getElementById('importFile');

// Initialize quotes and filter from local storage
function initialize() {
    // Load quotes from local storage
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes;
    populateCategories();
    applySavedFilter();
    showRandomQuote();
}

// Function to show a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = 'No quotes available.';
        return;
    }
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = 'No quotes available for this category.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.innerHTML = `<p>${filteredQuotes[randomIndex].text}</p><p><i>${filteredQuotes[randomIndex].category}</i></p>`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
    if (newQuoteText === '' || newQuoteCategory === '') {
        alert('Please enter both quote text and category.');
        return;
    }
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    populateCategories();
    showRandomQuote();
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to export quotes as JSON
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
            quotes = importedQuotes;
            saveQuotes();
            populateCategories();
            showRandomQuote();
            alert('Quotes imported successfully!');
        } else {
            alert('Invalid file format.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories in the filter dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    saveSelectedFilter();
    showRandomQuote();
}

// Function to get quotes based on the selected filter
function getFilteredQuotes() {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory === 'all') {
        return quotes;
    }
    return quotes.filter(q => q.category === selectedCategory);
}

// Function to save the selected filter to local storage
function saveSelectedFilter() {
    localStorage.setItem('selectedFilter', categoryFilter.value);
}

// Function to apply the saved filter on page load
function applySavedFilter() {
    const savedFilter = localStorage.getItem('selectedFilter');
    if (savedFilter) {
        categoryFilter.value = savedFilter;
    }
}

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
exportQuotesButton.addEventListener('click', exportQuotes);

// Initialize application
initialize();
