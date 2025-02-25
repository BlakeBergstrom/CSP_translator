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
        const lowerWord = word.toLowerCase().replace(/[^\w]/g, ""); // method /[^\w] represents all non alphanumeric charecters and method /g ensures this is done globally without the need for a loop

        // Default translation is the original word itself
        let translation = word;

        // Simplified translation logic using a lookupKey based on the direction
        let lookupKey = lowerWord;

        // Set the lookupKey based on the translation direction
        if (direction === "toSpanish" || direction === "toSpanishFromItalian") {
            lookupKey = lowerWord + "_es"; // For Spanish, append "_es"
        } else if (direction === "toItalianFromSpanish") {
            lookupKey = lowerWord + "_it"; // For Italian, append "_it"
        }

        // Find the translation from the dictionary using the lookupKey
        translation = findTranslation(lookupKey) || word;

        // Return the translated word (or the original word if no translation is found)
        return translation;
    });

    // Join the translated words into a single string with spaces in between and display the result
    document.getElementById("output-text").textContent = translatedWords.join(" ");
});

// Helper function to find the translation in the dictionary
function findTranslation(key) {
    return dictionary.find(pair => pair[0] === key)?.[1];
}
