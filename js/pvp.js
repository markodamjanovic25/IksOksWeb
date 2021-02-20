let TurnX = true;
let Board = [, , , , , , , ,];
let idCounterX = 0;
let idCounterO = 0;
let GameStarted = false;
let winnerIsThere = false;
let board = document.getElementById('board');
let info = document.getElementById('info');
let gameNotStartedDiv = document.getElementById('gameNotStarted');
let winnerParagraph = document.getElementById("turn2play");
let firstPlayerName = document.getElementById("firstPlayerName").value;
let secondPlayerName = document.getElementById("secondPlayerName").value;

class Sign {
    constructor(name, mark, id) {
        this.Name = name,
            this.Mark = mark,
            this.Id = id
    }
}

function MouseOverHandler(id) {
    let targetField = document.getElementById(id);
    if (TurnX) {
        targetField.style.backgroundColor = "#240063";
    }
    else {
        targetField.style.backgroundColor = "whitesmoke";
    }
}

function MouseOutHandler(id) {
    let targetField = document.getElementById(id);
    targetField.style.backgroundColor = "#ffc852";
}

function NameInputValidation() {
    firstPlayerName = document.getElementById("firstPlayerName").value;
    secondPlayerName = document.getElementById("secondPlayerName").value;
    if (firstPlayerName == "" && secondPlayerName == "") {
        return false;
    }
    else {
        return true;
    }
}

function StartGame() {
    firstPlayerName = document.getElementById("firstPlayerName").value;
    secondPlayerName = document.getElementById("secondPlayerName").value;
    if (document.getElementById("firstPlayerName").value != "" && document.getElementById("secondPlayerName").value != "") {
        GameStarted = true;
        board.style.pointerEvents = "auto";
        winnerParagraph.innerText = "Turn to play: X";
        info.removeChild(gameNotStartedDiv);

        let gameIsStartedDiv = document.createElement('DIV'); //all div holder
        info.appendChild(gameIsStartedDiv);

        let firstPlayerInfo = document.createElement('DIV'); //firstPlayerInfo div
        firstPlayerInfo.classList.add('firstPlayerInfo');
        gameIsStartedDiv.appendChild(firstPlayerInfo);


        let newGameButtonDivInfo = document.createElement('DIV');
        newGameButtonDivInfo.classList.add('buttonDiv');
        gameIsStartedDiv.appendChild(newGameButtonDivInfo);


        let newGameButtonInfo = document.createElement('BUTTON');
        newGameButtonInfo.classList.add('mainBtn');
        newGameButtonInfo.setAttribute("onclick", "NewGame()");
        newGameButtonInfo.innerText = "NEW GAME";
        newGameButtonDivInfo.appendChild(newGameButtonInfo);

        let secondPlayerInfo = document.createElement('DIV');
        secondPlayerInfo.classList.add('secondPlayerInfo');
        gameIsStartedDiv.appendChild(secondPlayerInfo);

        let firstPlayerNameParagraph = document.createElement('P');
        let textFirst = document.createTextNode(firstPlayerName);
        firstPlayerNameParagraph.appendChild(textFirst);
        firstPlayerNameParagraph.classList.add('firstPlayer');
        firstPlayerInfo.appendChild(firstPlayerNameParagraph);

        let secondPlayerNameParagraph = document.createElement('P');
        let textSecond = document.createTextNode(secondPlayerName);
        secondPlayerNameParagraph.appendChild(textSecond);
        secondPlayerNameParagraph.classList.add('secondPlayer');
        secondPlayerInfo.appendChild(secondPlayerNameParagraph);
    }
    Validation();
}


function Validation(mainButton) {
    const inputFirst = document.getElementById("firstPlayerName");
    const inputSecond = document.getElementById("secondPlayerName");
    const submit = document.getElementById("startGameBtn");
    let pattern = /^[a-zA-z\d]{4,} $/;

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if (inputFirst.value === "") {
            inputFirst.classList.add("apply-shake", "border-red");

        }
        if (inputSecond.value === "") {
            inputSecond.classList.add("apply-shake", "border-red");
        }
    });
}

function divClickX(id) {
    let targetDiv = document.getElementById(id)
    targetDiv.style.backgroundColor = "#ffc852";
    let madeamove = document.createElement("H1")
    madeamove.classList.add("fieldCompleted")
    madeamove.setAttribute("id", "p" + id)
    let text = document.createTextNode("X")
    madeamove.appendChild(text)
    targetDiv.appendChild(madeamove)
    targetDiv.style.pointerEvents = "none";
}

function divClickO(id) {
    let targetDiv = document.getElementById(id)
    let madeamove = document.createElement("H1")
    madeamove.classList.add("fieldCompleted")
    madeamove.setAttribute("id", "p" + id)
    madeamove.style.color = "whitesmoke";
    let text = document.createTextNode("O")
    madeamove.appendChild(text)
    targetDiv.appendChild(madeamove)
    targetDiv.style.pointerEvents = "none";
}

function TurnToPlay() {
    if (TurnX) {
        winnerParagraph.innerText = "Turn to play: X";
    }
    else {
        winnerParagraph.innerText = "Turn to play: O";
    }
}

function makeAMove(id) {
    if (TurnX) {
        divClickX(id);
        Board[id] = new Sign(firstPlayerName, "X", idCounterX);
        TurnX = false;
        idCounterX++;

    }
    else {
        divClickO(id)
        Board[id] = new Sign(secondPlayerName, "O", idCounterO);
        TurnX = true;
        idCounterO++;
    }
    TurnToPlay();
    DoWeHaveAWinner();
}

function DoWeHaveAWinner() {
    //checking first row if we have a winner
    CheckForAWinner(0, 1, 2);
    //checking second row if we have a winner
    CheckForAWinner(3, 4, 5);
    //checking third row if we have a winner
    CheckForAWinner(6, 7, 8);
    //checking first column if we have a winner
    CheckForAWinner(0, 3, 6);
    //checking second column if we have a winner
    CheckForAWinner(1, 4, 7);
    //checking third column if we have a winner
    CheckForAWinner(2, 5, 8);
    //checking for a winner in diagonal starting from field with index zero
    CheckForAWinner(0, 4, 8);
    //checking for a winner in diagonal starting from field with index two
    CheckForAWinner(2, 4, 6);
}

function CheckForAWinner(first, second, third) {
    if (Board[first] != undefined && Board[second] != undefined && Board[third] != undefined) {
        if ((Board[first].Mark == Board[second].Mark) && Board[second].Mark == Board[third].Mark) {
            board.style.pointerEvents = "none";
            if (Board[first].Mark == "X") {
                WeHaveAWinner(first, second, third, "#240063");
                winnerParagraph.innerText = "THE WINNER IS " + firstPlayerName;
            }
            else {
                WeHaveAWinner(first, second, third, "whitesmoke");
                winnerParagraph.innerText = "THE WINNER IS " + secondPlayerName;
            }
        }
    }
}

function WeHaveAWinner(first, second, third, bgColor) {
    winnerIsThere = true;
    let firstField = document.getElementById(first);
    let secondField = document.getElementById(second);
    let thirdField = document.getElementById(third);

    let firstFieldParagraph = document.getElementById("p" + first);
    let secondFieldParagraph = document.getElementById("p" + second);
    let thirdFieldParagraph = document.getElementById("p" + third);

    let winnerFields = [firstField, secondField, thirdField];
    let winnerFieldParagraphs = [firstFieldParagraph, secondFieldParagraph, thirdFieldParagraph];

    winnerFields.forEach(field => {
        ChangeBgColorForWinner(field, bgColor);
    });
    timeVar = 0;
    if(!TurnX)
    {
        winnerFieldParagraphs.forEach(p => {
        p.style.color = "white";
    });
    }
    else {
        winnerFieldParagraphs.forEach(p => {
            p.style.color = "#ffc852";
        });
    }
}

let timeVar = 0;
let timesToChangeBgColor = 0;

function ChangeBgColorForWinner(field, bgColor) {
        setTimeout(() => {
            field.style.backgroundColor = bgColor;
        }, timeVar);
        timeVar += 230;   
}

function NewGame() {
    let div0 = document.getElementById("0");
    let div1 = document.getElementById("1");
    let div2 = document.getElementById("2");
    let div3 = document.getElementById("3");
    let div4 = document.getElementById("4");
    let div5 = document.getElementById("5");
    let div6 = document.getElementById("6");
    let div7 = document.getElementById("7");
    let div8 = document.getElementById("8");
    let AllDivArray = [div0, div1, div2, div3, div4, div5, div6, div7, div8];

    AllDivArray.forEach(div => {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    });
    AllDivArray.forEach(div => {
        div.style.backgroundColor = "#ffc852";
        div.style.pointerEvents = "auto";
    });

    Board = [, , , , , , , ,];
    TurnX = true;
    idCounterX = 0;
    idCounterO = 0;
    winnerIsThere = false;
    TurnToPlay();
}
