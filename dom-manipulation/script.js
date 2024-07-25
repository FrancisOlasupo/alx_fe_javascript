const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Motivation" }
  ];
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
  }
  
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = { text: newQuoteText, category: newQuoteCategory };
      quotes.push(newQuote);
      updateQuoteList();
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  function updateQuoteList() {
    const quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = '';
    quotes.forEach(quote => {
      const li = document.createElement("li");
      li.textContent = `"${quote.text}" - ${quote.category}`;
      quoteList.appendChild(li);
    });
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  document.addEventListener("DOMContentLoaded", () => {
    showRandomQuote();
    updateQuoteList();
  });
  