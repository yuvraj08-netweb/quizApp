const startBtn = selectElement("#startBtn");
const questionNumber = selectElement(".questionNumber");
const question = selectElement(".question");
const optionOneL = selectElement("#optionOneL");
const optionTwoL = selectElement("#optionTwoL");
const optionThreeL = selectElement("#optionThreeL");
const optionFourL = selectElement("#optionFourL");
const nextBtn = selectElement("#nextBtn");
const submitBtn = selectElement("#submitBtn");
const score = selectElement(".score");
const finalParagraph = selectElement(".finalParagraph");

const options = document.querySelectorAll("input");
// Adding event listener to start the game
startBtn.addEventListener('click', startGame);
// Array to store the fetched data
let questionArray = [];
// variable to to manage the current question
let currentQuestion = 0;
// variable to to manage the user score
let userScore = 0;

// Setting the checked state of radio button to true when "changed"
options.forEach(option => {
    option.addEventListener('change', () => {
        option.checked = true
    });
    option.checked = false;
});

// Fetching Data From the Source
function fetchData() {
    fetch("./question.json")
        .then(response => response.json())
        .then(data => setArray(data))
}
// Setting the array with data recieved in response
function setArray(sampleArray) {
    questionArray = sampleArray;
    setData(currentQuestion);
}

// Function to start the game
function startGame() {
    try {
        fetchData();
        setDisplay("#startBtn", "none");
        setDisplay("#quizApp", "block");
    } catch (error) {
        alert(`Game Start Failed : ${error}. Try Reloading !`);
    }
}
// Setting the data recieved from the fetch api to the html elements
function setData(n) {
    // Setting the labels for user to see
    setInnerHtml(questionNumber, `Question Number : ${questionArray[n].questionNumber}`);
    setInnerHtml(question, questionArray[n].question);
    setInnerHtml(optionOneL, questionArray[n].optionA);
    setInnerHtml(optionTwoL, questionArray[n].optionB);
    setInnerHtml(optionThreeL, questionArray[n].optionC);
    setInnerHtml(optionFourL, questionArray[n].optionD);
    // Setting the values for input field to compare and check with correct answer
    setValue("#optionOne", questionArray[n].optionA);
    setValue("#optionTwo", questionArray[n].optionB);
    setValue("#optionThree", questionArray[n].optionC);
    setValue("#optionFour", questionArray[n].optionD);
}

// Function for setting values
function setValue(element, value) {
    document.querySelector(element).value = value;
}

// When a user click next button it handles the performance
function handleNextBtn() {
    
    if (!(currentQuestion >=(questionArray.length))) {
        let selectedOption;
        options.forEach((option) => {
            if (option.checked) {
                console.log(option);
                selectedOption = option.value;
            }
        })
        console.log(selectedOption);

        //Checks If Option is selected or not and then move next
        if (selectedOption === undefined) {
            alert("Please select an option!");
        } 
        else {

            if (selectedOption === questionArray[currentQuestion].correctOption) {
                userScore++;
                console.log(userScore);
            }
            else{
                console.log("Value Does'nt Macthed!");
            }
            currentQuestion++;
            
            if (!(currentQuestion >= (questionArray.length))) {
                setData(currentQuestion);
            }
        }
        options.forEach((option)=>{
            option.checked = false;
        });

        if(currentQuestion ===(questionArray.length)){
            setDisplay("#nextBtn", "none");
            setDisplay("#submitBtn", "block");
            setDisplay(".upperContainer","none");
            setInnerHtml(finalParagraph,"All Questions Answered!. Click Submit To View Your Score.")
        }
    }

}

// Function to show the scores at the end, triggered on submit button
function showScore() {
    setDisplay(".heroScore", "flex");
    setDisplay("#quizApp", "none");
    setInnerHtml(score, `Your Score : ${userScore}`);
}

// Funtion to reset the game
function handleReset(){
    location.reload();
}

// Changing the display property for elements
function setDisplay(element, value) {
    document.querySelector(element).style.display = value;
}

// Changing the inner html of elements
function setInnerHtml(element, value) {
    element.innerHTML = value;
}

// For Selecting the html elements
function selectElement(element){
    return document.querySelector(element);
}

