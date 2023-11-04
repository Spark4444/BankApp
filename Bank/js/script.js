// Initialize variables
let cardState = 0;
let userName = "Richard";

// Updates the user name
function updateName() {
    document.querySelector(".userName").innerHTML = `Welcome back, ${userName}!`;
}

console.log(window.innerHeight);
console.log(window.innerWidth);

updateName();

// Flips card to show the cvv
function flipCard() {
    cardState = binarySwitch(cardState);
    let card = document.querySelector(".card");
    
    if (cardState == 0) {
        card.style.transform = "rotateY(0deg)";
        setTimeout(function() {
            card.innerHTML = `
                <div class="name">SPR Bank</div>
                <div class="cardNum">${formatCardNum(cardNum)}</div>
                <div class="cardDate">${cardDate}</div>
                <div class="name2">VISA</div>
            `;
            document.querySelector(".card").style.justifyContent = "";
        }, 150);
    } else if (cardState == 1) {
        card.style.transform = "rotateY(180deg)";
        setTimeout(function() {
            card.innerHTML = `
                <div class="backLine"></div>
                <div class="cvv">${cvv}</div>
            `;
            document.querySelector(".cvv").style.transform = "rotateY(180deg)";
            document.querySelector(".backLine").style.transform = "rotateY(180deg)";
            document.querySelector(".card").style.justifyContent = "space-around";
        }, 150);
    }
}
