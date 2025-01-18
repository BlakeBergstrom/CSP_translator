document.getElementById("translate-button").addEventListener("click", function () {
    const inputText = document.getElementById("input-text").value; // Get user input
    const direction = document.getElementById("language-direction").value; // Get selected direction

    if (!inputText.trim()) {
        document.getElementById("output-text").textContent = "Please enter text to translate.";
        return;
    }

    const words = inputText.split(" "); // Split text into words
    const translatedWords = words.map(word => {
        const lowerWord = word.toLowerCase().replace(/[^\w]/g, ""); // Case insensitive and remove punctuation

        if (direction === "toItalian") {
            return bidirectionalDictionary[lowerWord] || word; // English → Italian
        } else if (direction === "toSpanish") {
            return bidirectionalDictionary[lowerWord + "_es"] || word; // English → Spanish
        } else if (direction === "toGerman") {
            return bidirectionalDictionary[lowerWord + "_de"] || word; // English → German
        } else if (direction === "toEnglishFromGerman") {
            return bidirectionalDictionary[lowerWord] || word; // German → English
        } else {
            return bidirectionalDictionary[lowerWord] || word; // Default case
        }
    });

    document.getElementById("output-text").textContent = translatedWords.join(" "); // Join translated words
});
