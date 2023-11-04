// Initialize variables
let passcode  = 1234;
let passcodeEntered = false;
let activeNumbers = document.querySelectorAll(".active");
let lastActive = 0;
let keycodes = true;

// Function to add numbers
function enterNum(num){
    if(passcodeEntered == false){
        passcodeEntered = num;
        activeNumbers[lastActive].style.background = "black";
        lastActive++;
    }
    else if(lastActive !== 4){
        passcodeEntered+= num;
        activeNumbers[lastActive].style.background = "black";
        lastActive++;
    }
    if(passcodeEntered.length == 4){
        if(passcodeEntered == passcode){
            document.querySelector(".passcodeWindow").style.opacity = "0";
            keycodes = false;
            setTimeout(() => {
                document.querySelector(".passcodeWindow").style.display = "none";
                document.querySelector(".blocksWrap").style.display = "";
                setTimeout(() => {
                    document.querySelector(".blocksWrap").style.opacity = "1";
                }, 10);
            }, 500);
            activeNumbers.forEach(element => {
                element.style.background = "green";
            });
        }
        else{
            activeNumbers.forEach(element => {
                element.style.background = "red";
            });
        }
    }
}

// Function to delete numbers
function deleteNum(){
    if(passcodeEntered !== false && lastActive !== 0){
        lastActive--;
        passcodeEntered = passcodeEntered.slice(0, -1);
        activeNumbers[lastActive].style.background = "";
    }
    if(lastActive == 3){
        activeNumbers.forEach(element => {
            if(element !== activeNumbers[3]){
            element.style.background = "black";
            }
        });
    }
}

// Event listener for keydown events
document.addEventListener('keydown', function(event) {
    let key = event.which || event.keyCode;
    if(keycodes == true){
    switch(key){
        case 48: case 96: // 0
            enterNum("0");
            break;
        case 49: case 97: // 1
            enterNum("1");
            break;
        case 50: case 98: // 2
            enterNum("2");
            break;
        case 51: case 99: // 3
            enterNum("3");
            break;
        case 52: case 100: // 4
            enterNum("4");
            break;
        case 53: case 101: // 5
            enterNum("5");
            break;
        case 54: case 102: // 6
            enterNum("6");
            break;
        case 55: case 103: // 7
            enterNum("7");
            break;
        case 56: case 104: // 8
            enterNum("8");
            break;
        case 57: case 105: // 9
            enterNum("9");
            break;
        case 8: case 46: // delete, backspace
            deleteNum();
            break;
    }
    }
});
