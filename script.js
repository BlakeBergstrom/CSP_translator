document.getElementById("translate-button").addEventListener("click", function () {
    // Get the user input from the input field
    const inputText = document.getElementById("input-text").value;

    // Get the selected language direction from the dropdown (e.g., toItalian, toSpanish)
    const direction = document.getElementById("language-direction").value;

    // Check if the input text is empty (after trimming leading/trailing spaces)
    if (!inputText.trim()) {
        // If empty, display a message asking the user to enter text
        document.getElementById("output-text").textContent = "Please enter text to translate.";
        return; // Exit the function early
    }

    // Split the input text into an array of words based on spaces
    const words = inputText.split(" ");

    // Process each word in the array to get its translation
    const translatedWords = words.map(word => {
        // Convert the word to lowercase and remove any non-alphanumeric characters (punctuation)
        const lowerWord = word.toLowerCase().replace(/[^\w]/g, "");

        // Default translation is the original word itself
        let translation = word;

        // Check the selected translation direction and look up the translation in the dictionary
        if (direction === "toItalian") {
            // If translating to Italian, find the translation in the dictionary
            translation = dictionary.find(pair => pair[0] === lowerWord)?.[1] || word;
        } else if (direction === "toSpanish") {
            // If translating to Spanish, look for the translation with "_es" suffix (for Spanish)
            translation = dictionary.find(pair => pair[0] === lowerWord + "_es")?.[1] || word;
        } else if (direction === "toEnglishFromSpanish") {
            // If translating from Spanish to English, find the English translation
            translation = dictionary.find(pair => pair[0] === lowerWord)?.[1] || word;
        } else if (direction === "toSpanishFromItalian") {
            // If translating from Italian to Spanish, look for the translation with "_es" suffix
            translation = dictionary.find(pair => pair[0] === lowerWord + "_es")?.[1] || word;
        } else if (direction === "toItalianFromSpanish") {
            // If translating from Spanish to Italian, look for the translation with "_it" suffix (for Italian)
            translation = dictionary.find(pair => pair[0] === lowerWord + "_it")?.[1] || word;
        } else {
            // Default case (Italian to English)
            translation = dictionary.find(pair => pair[0] === lowerWord)?.[1] || word;
        }

        // Return the translated word (or the original word if no translation is found)
        return translation;
    });

    // Join the translated words into a single string with spaces in between
    document.getElementById("output-text").textContent = translatedWords.join(" ");
});
