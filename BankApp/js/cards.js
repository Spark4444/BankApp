// Initialize variables
let money = 100;
let cardNum = "1345999302352468";
let cardDate = "10/29";
let cvv = generateCVV();
let transactions = document.querySelector(".transactions");

// Updates the page with the variables
function updateCard() {
    if (cardState == 0) {
        document.querySelector(".card").innerHTML = `
            <div class="name">SPR Bank</div>
            <div class="cardNum">${formatCardNum(cardNum)}</div>
            <div class="cardDate">${cardDate}</div>
            <div class="name2">VISA</div>
        `;
    } else if (cardState == 1) {
        document.querySelector(".card").innerHTML = `
            <div class="backLine"></div>
            <div class="cvv">${cvv}</div>
        `;
    }
    document.querySelector(".money").innerHTML = `${parseFloat(money).toFixed(2)} ₴`;
}

// Adds money from another card
function addMoney() {
    let cardNumberRegex = /^\d{16}$/;
    let cardDateRegex = /^(0[1-9]|1[0-2])\/(2[4-9]|\d{3,})$/;
    let cvvRegex = /^\d{3}$/;
    let sumRegex = /^(0*[1-9]\d*(\.[0-9]{1,2})?)$/;

    let cardNumber = getValidInput("Please enter your 16-digit card number (format: XXXX XXXX XXXX XXXX):", cardNumberRegex);
    let cardDate = getValidInput("Please enter your card expiry date (format: MM/YY):", cardDateRegex);
    let cvv = getValidInput("Please enter your 3-digit CVV:", cvvRegex);
    let sum = getValidInput("Please enter the sum of money (greater than 0):", sumRegex);

    money = parseFloat(money) + parseFloat(sum);
    money = (money.toFixed(2)).toString();
    transactions.innerHTML += `received ${sum} ₴ from a card: ${formatCardNum(cardNumber)} <br><br>`;
    updateCard();
}

// Transfers money to another card
function transferMoney() {
    if(money > 0){
        let regex = /^\d{16}$/;
        let cardNumber = prompt("Please enter your 16-digit card number (format: XXXX XXXX XXXX XXXX");
        cardNumber = removeWhitespaces(cardNumber);
        while(!regex.test(cardNumber) && cardNumber !== "null"){
            cardNumber = prompt("Please enter your 16-digit card number (format: XXXX XXXX XXXX XXXX");
            cardNumber = removeWhitespaces(cardNumber);
        }
        regex = /^0$|^\d+([.,]\d{1,2})?$/;
        let sum = parseFloat(prompt("Please enter the amount of money"));
        console.log(!regex.test(sum));
        console.log(sum > parseFloat(money));
        while(!regex.test(sum) || sum > parseFloat(money)){
            if(Number.isNaN(sum)){
                break;
            }
            sum = parseFloat(prompt("Please enter the amount of money"));
        }
        if(!Number.isNaN(sum) && sum <= parseFloat(money) && sum !== 0){
        money -= sum;
        money = (money.toFixed(2)).toString();
        transactions.innerHTML += `transfered ${sum} ₴ to a card: ${formatCardNum(cardNumber)} <br><br>`;
        }
        updateCard();
        }
}

// Converts current money in the bank to the given currency
async function convertMoney() {
    let currency = getValidInput("What currency do you want to convert to? (format: XXX)", /^[a-zA-Z]{3}$/);
    currency = currency.toUpperCase();
    if(currency !== "null"){
        let result = await convertCurrency(money, "UAH", currency);
        result = result.includes("NaN") ? replaceNaN(result,"There's no such currency : ") : result;
        alert(result);
    }
}

updateCard();
