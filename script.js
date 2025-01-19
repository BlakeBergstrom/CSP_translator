const dictionaryMapping = {
    toItalian: "dictionaries/english_italian.js",
    toEnglish: "dictionaries/italian_english.js",
    toSpanish: "dictionaries/english_spanish.js",
    toEnglishFromSpanish: "dictionaries/spanish_english.js",
    toSpanishFromItalian: "dictionaries/italian_spanish.js",
    toItalianFromSpanish: "dictionaries/spanish_italian.js"
};

// Function to load a dictionary dynamically
function loadDictionary(dictionaryPath, callback) {
    const script = document.createElement("script");
    script.src = dictionaryPath;
    script.type = "text/javascript";

    // When the script is successfully loaded
    script.onload = () => {
        console.log(`Dictionary loaded: ${dictionaryPath}`);
        callback();
    };

    // Handle loading errors
    script.onerror = (error) => {
        console.error(`Error loading dictionary script: ${dictionaryPath}`, error);
        document.getElementById("output-text").textContent = "Error loading dictionary. Please try again.";
    };

    document.head.appendChild(script);
}

// Add event listener for the translate button
document.getElementById("translate-button").addEventListener("click", function () {
    const inputText = document.getElementById("input-text").value.trim(); // Get user input
    const direction = document.getElementById("language-direction").value; // Get selected direction

    if (!inputText) {
        document.getElementById("output-text").textContent = "Please enter text to translate.";
        return;
    }

    // Load the appropriate dictionary
    const dictionaryPath = dictionaryMapping[direction];
    if (!dictionaryPath) {
        document.getElementById("output-text").textContent = "Invalid translation direction selected.";
        return;
    }

    loadDictionary(dictionaryPath, () => {
        let dictionary;
        switch (direction) {
            case "toItalian":
                dictionary = englishToItalian;
                break;
            case "toEnglish":
                dictionary = italianToEnglish;
                break;
            case "toSpanish":
                dictionary = englishToSpanish;
                break;
            case "toEnglishFromSpanish":
                dictionary = spanishToEnglish;
                break;
            case "toSpanishFromItalian":
                dictionary = italianToSpanish;
                break;
            case "toItalianFromSpanish":
                dictionary = spanishToItalian;
                break;
        }

        if (!dictionary) {
            document.getElementById("output-text").textContent = "Error: Dictionary not loaded.";
            return;
        }

        // Translate the input text
        const words = inputText.split(/\s+/); // Split text into words
        const translatedWords = words.map(word => {
            const lowerWord = word.toLowerCase().replace(/[^\w]/g, ""); // Normalize the word
            return dictionary[lowerWord] || word; // Translate or keep the original word
        });

        // Display the translated text
        document.getElementById("output-text").textContent = translatedWords.join(" ");
    });
});
