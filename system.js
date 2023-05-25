const IMAGES = ["Images/mineral1.png", "Images/mineral2.png", "Images/mineral3.png", "Images/mineral4.png", "Images/mineral5.png", "Images/mineral6.png", "Images/mineral7.png", "Images/mineral8.png"];
let indexes = [0, 1, 2, 3, 4, 5, 6, 7];
let id = 0;
let firstChoice;
let secondChoice;
let first = true;

function setup(){
    const BOARD_SIZE = 4;
    let board = document.getElementById("board");

    randomArray = createRandomArray(indexes);
    let randomArray2 = createRandomArray(indexes);
    randomArray = randomArray.concat(randomArray2);
    parsAmount = randomArray.length;

    for(let i = 0; i < BOARD_SIZE; i++){
        for(let j = 0; j < BOARD_SIZE; j++){
            board.innerHTML += `<div class='field' id=${id} onclick='showField(${id})'><h1 class='questionMark'>?</h1></div>`;
            id++;
        }
        board.innerHTML += "<div style='clear: both;'></div>";
    }
    board.innerHTML += "<div id='endDiv'></div>";
    let endDiv = document.getElementById("endDiv");
    endDiv.innerHTML += "<button id='reset' onclick='location.reload();'>Reset</button>";
}

function verticalAllign(){
    let screenHeight = window.innerHeight;
    let board = document.getElementById("board");
    let boardHeight = board.offsetHeight;
    let marginTop = screenHeight / 2 - boardHeight / 2;

    board.style.setProperty("margin-top", `${marginTop}px`);
}


function createRandomArray(array){
    const OLD_ARRAY = Array.from(array);
    const NEW_ARRAY = [];

    while(OLD_ARRAY.length != 0){
        let randomIndex = getRandomNum(0, OLD_ARRAY.length - 1);
        NEW_ARRAY.push(OLD_ARRAY[randomIndex]);
        OLD_ARRAY.splice(randomIndex, 1);    
    }
    return NEW_ARRAY;
}

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showField(id){
    let field = document.getElementById(id);

    field.style.setProperty("transform", "rotateZ(360deg)");
    field.innerHTML = `<img src='${IMAGES[randomArray[id]]}'>`;
    
    if(first)firstChoice = id;
    else secondChoice = id;

    if(!first)compare(firstChoice, secondChoice);
    else first = false;

}

function compare(firstId, secondId){
    if(firstId == secondId)return;
    else if(randomArray[firstId] == randomArray[secondId])same(firstId, secondId);
    else different(firstId, secondId);
    first = true;
}

function same(firstId, secondId){
    let field1 = document.getElementById(firstId);
    let field2 = document.getElementById(secondId);
    field1.id = "";
    field2.id = "";
    field1.setAttribute("onclick", "");
    field2.setAttribute("onclick", "");
    parsAmount -= 2;
    if(parsAmount == 0)win();
}

function different(firstId, secondId){
    let field1 = document.getElementById(firstId);
    let field2 = document.getElementById(secondId);
    const TIMEOUT = 1500;

    for(let i = 0; i < randomArray.length; i++){
        if(document.getElementById(i)){
            let block = document.getElementById(i);
            block.setAttribute("onclick", ""); 
        }
    }

    setTimeout(function (){
        field1.style.setProperty("transform", "rotateZ(0deg)");
        field2.style.setProperty("transform", "rotateZ(0deg)");
        field1.innerHTML = "<h1 class='questionMark'>?</h1>";
        field2.innerHTML = "<h1 class='questionMark'>?</h1>";

        for(let i = 0; i < randomArray.length; i++){
            if(document.getElementById(i)){
                let block = document.getElementById(i);
                block.setAttribute("onclick", `showField(${i})`); 
            }
        }
    }, TIMEOUT);
}

function win(){
    let endDiv = document.getElementById("endDiv");
    let resetBtn = document.getElementById("reset");
    
    endDiv.style.zIndex = "1";
    endDiv.style.backgroundColor = "rgba(225, 225, 225, .8)";
    resetBtn.style.backgroundColor = "rgba(104, 171, 128, 1)";
}