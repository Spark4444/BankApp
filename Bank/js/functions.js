// Save a key-value pair to local storage
const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);

// Retrieve a value from local storage by its key
const getFromLocalStorage = key => localStorage.getItem(key);

// Function to generate a random number between a start and end value
const getRandomNumber = (start, end) => Math.floor(Math.random() * (end - start + 1)) + start;

// Checks if a str is made out of only numbers
const isNumeric = str => /^\d+$/.test(str);

// formats a string like this: 1345 9993 0235 2468
const formatCardNum = str => {
    let formattedStr = '';
    for(let i = 0; i < str.length; i++) {
        if(i % 4 === 0 && i !== 0) {
            formattedStr += ' ';
        }
        formattedStr += str[i];
    }
    return formattedStr;
};

// Generates a three-digit CVV code for a credit card
const generateCVV = () => Math.floor(Math.random() * 900) + 100;

// Converts an amount of money from one currency to another using an API
const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        return `${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Error:", error);
    }
};

// Converts one U.S. dollar and one euro to Ukrainian hryvnia and displays the results
const convert = async () => {
    UA_US = await convertCurrency("1","USD","UAH");
    UA_EU = await convertCurrency("1","EUR","UAH");
    document.querySelector(".currentExchangeRate").innerHTML = 
    `current UAH to EUR exchange rate : ${UA_EU}
    <br><br>
    current UAH to USD exchange rate : ${UA_US}`;
};

convert();

// Replaces any occurrence of NaN in the input with a given replacement value
const replaceNaN = (input, replacement) => input.replace(/NaN/g, replacement);

// Removes any whitespace characters from a given string
const removeWhitespaces = str => str.replace(/\s+/g, '');

// Prompts the user for an input that matches a given regular expression
const getValidInput = (promptText, regex) => {
    let input = removeWhitespaces(prompt(promptText));
    while(!regex.test(input) && input !== "null"){
        input = removeWhitespaces(prompt(promptText));
    }
    return input;
};

// Switches a binary digit from 0 to 1 or from 1 to 0
const binarySwitch = bin => bin == 0 ? 1 : 0;
