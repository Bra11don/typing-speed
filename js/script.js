const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time span b"),
cpmTag = document.querySelector(".cpm span"),
wpmTag = document.querySelector(".wpm span"),
tryAgainBtn = document.querySelector("button ");
accuracyTag = document.querySelector(".accuracy span b")

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph(){
    //getting random number which is always within paragraphs array length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // console.log(paragraphs[randIndex].split("")) 
    //getting random paragraphs array, splitting all characters inside span then adding span inside p tag
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag; //adds randomly generated paragraph to the textbox
    })
    typingText.querySelectorAll("span")[0].classList.add("active");
    //focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())

}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 &&timeLeft >0){
        if(!isTyping){ //timer only starts when the first key is pressed
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
    
        //if user hasnt entered any character or pressed backspace
        if(typedChar == null){
            charIndex--;
            //decrement mistakes only if the charIndex span contains incorrect class
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect") //decrement the index and remove any correct/incorrect details about it
        }
        else{
            if(characters[charIndex].innerText===typedChar){
                //if user tyoed character and shown character matched then add the correct class else increment the mistakes and add he incorrect class
                characters[charIndex].classList.add("correct")
            }
            else{
                // console.log("incorrect")
                characters[charIndex].classList.add("incorrect")
                mistakes++
            }
            charIndex++;
        }
     
        //the blinking cursor 
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active")
    
        let wpm = Math.round((((charIndex - mistakes) / 5)/(maxTime - timeLeft)) * 60);
        //if wpm is 0,empty or infinity then its value is 0
        wpm = wpm <0 || !wpm ||wpm === Infinity ? 0:wpm;
        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - mistakes; //cpm doesnt couunt mistakes
        accuracyTag.innerText = (Math.round(((charIndex - mistakes)/charIndex)*100))
    
    }
    else{
        inpField.value = "";
        clearInterval(timer);
    }
}

function initTimer(){
    //if timeleft is greater than 0 then decrement the timeleft else clear the timer
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round((((charIndex - mistakes) / 5)/(maxTime - timeLeft)) * 60);
        wpmTag.innerText = wpm;
    }
    else{
        clearInterval(timer);
    }
}

function resetGame(){
    //calling loadparagraph function and resetting each variables and elements value to default
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpm.Tag.innerText = 0;
    cpmTag.innerText = 0;
    accuracyTag.innerText = 0;

}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);