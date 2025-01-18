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
        } else {
            return bidirectionalDictionary[lowerWord] || word; // Italian → English
        }
    });

    document.getElementById("output-text").textContent = translatedWords.join(" "); // Join translated words
});
