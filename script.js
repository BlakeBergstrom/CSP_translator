let dictionary = {};

function loadDictionary(languageFrom, languageTo) {
    let fileName = '';

    // Set the correct dictionary file based on selected languages
    if (languageFrom === 'english' && languageTo === 'italian') {
        fileName = 'english_italian.js';
    } else if (languageFrom === 'italian' && languageTo === 'english') {
        fileName = 'italian_english.js';
    } else if (languageFrom === 'english' && languageTo === 'spanish') {
        fileName = 'english_spanish.js';
    } else if (languageFrom === 'spanish' && languageTo === 'english') {
        fileName = 'spanish_english.js';
    } else if (languageFrom === 'spanish' && languageTo === 'italian') {
        fileName = 'spanish_italian.js';
    } else if (languageFrom === 'italian' && languageTo === 'spanish') {
        fileName = 'italian_spanish.js';
    }

    // Dynamically load the dictionary script
    const script = document.createElement('script');
    script.src = `dictionaries/${fileName}`;

    script.onload = function () {
        console.log(`${fileName} loaded successfully`);
    };

    script.onerror = function () {
        console.error(`Error loading ${fileName}`);
    };

    document.head.appendChild(script);
}

function translate() {
    // Get input word and language settings
    const word = document.getElementById("inputWord").value.toLowerCase();
    const languageFrom = document.getElementById("languageFrom").value;
    const languageTo = document.getElementById("languageTo").value;
    
    // Load the correct dictionary
    loadDictionary(languageFrom, languageTo);

    let translatedWord = "Word not found";

    // Wait for the dictionary to load, then translate
    setTimeout(() => {
        if (languageFrom === 'english' && languageTo === 'italian') {
            translatedWord = englishToItalian[word] || translatedWord;
        } else if (languageFrom === 'italian' && languageTo === 'english') {
            translatedWord = italianToEnglish[word] || translatedWord;
        } else if (languageFrom === 'english' && languageTo === 'spanish') {
            translatedWord = englishToSpanish[word] || translatedWord;
        } else if (languageFrom === 'spanish' && languageTo === 'english') {
            translatedWord = spanishToEnglish[word] || translatedWord;
        } else if (languageFrom === 'spanish' && languageTo === 'italian') {
            translatedWord = spanishToItalian[word] || translatedWord;
        } else if (languageFrom === 'italian' && languageTo === 'spanish') {
            translatedWord = italianToSpanish[word] || translatedWord;
        }

        // Display the translation
        document.getElementById("translatedWord").innerText = translatedWord;
    }, 1000); // Allow some time for the script to load
}
