
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

        let translation = word; // Default translation is the original word

        // Check the selected translation direction
        if (direction === "toItalian") {
            // English → Italian
            translation = bidirectionalDictionary.find(pair => pair[0] === lowerWord)?.[1] || word;
        } else if (direction === "toSpanish") {
            // English → Spanish
            translation = bidirectionalDictionary.find(pair => pair[0] === lowerWord + "_es")?.[1] || word;
        } else if (direction === "toEnglishFromSpanish") {
            // Spanish → English
            translation = bidirectionalDictionary.find(pair => pair[0] === lowerWord)?.[1] || word;
        } else if (direction === "toSpanishFromItalian") {
            // Italian → Spanish
            translation = bidirectionalDictionary.find(pair => pair[0] === lowerWord + "_es")?.[1] || word;
        } else if (direction === "toItalianFromSpanish") {
            // Spanish → Italian
            translation = bidirectionalDictionary.find(pair => pair[0] === lowerWord + "_it")?.[1] || word;
        } else {
            // Default for Italian → English
            translation = bidirectionalDictionary.find(pair => pair[0] === lowerWord)?.[1] || word;
        }

        return translation; // Return translated word
    });

    document.getElementById("output-text").textContent = translatedWords.join(" "); // Join translated words
});
