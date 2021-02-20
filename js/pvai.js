let brojac = 0; //koristi se da proverava da li je doslo do neresenog rezultata
let TurnX = true;
let Board = [, , , , , , , ,];
let idCounterX = 0;
let idCounterO = 0;
let GameStarted = false;
let winnerIsThere = false;
let board = document.getElementById('board');
let winnerParagraph = document.getElementById("turn2play");

class Sign {
    constructor(name, mark, id) {
        this.Name = name,
            this.Mark = mark,
            this.Id = id
    }
}

function MouseOverHandler(id) {
    let targetField = document.getElementById(id);
    targetField.style.backgroundColor = "whitesmoke";
}

function MouseOutHandler(id) {
    let targetField = document.getElementById(id);
    targetField.style.backgroundColor = "#240063";
}

function divClickX(id) {
    let targetDiv = document.getElementById(id)
    let madeamove = document.createElement("H1")
    madeamove.classList.add("fieldCompleted")
    madeamove.style.color = "whitesmoke";
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
    madeamove.style.color = "#ffc852";
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
    brojac++;
    if (TurnX) {
        divClickX(id);
        Board[id] = new Sign('Player', "X", idCounterX);
        TurnX = false;
        idCounterX++;
    }
    else {
        divClickO(id)
        Board[id] = new Sign('Bot', "O", idCounterO);
        TurnX = true;
        idCounterO++;
    }
    TurnToPlay();
    DoWeHaveAWinner();
}

function DoWeHaveAWinner() {
    if(brojac==9 && !winnerIsThere){
        winnerParagraph.innerText = "DRAW";
        board.style.pointerEvents = "none";
    }
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
                winnerParagraph.innerText = "THE WINNER IS " + 'Player';
            }
            else {
                WeHaveAWinner(first, second, third, "#ffc852");
                winnerParagraph.innerText = "THE WINNER IS " + 'Bot';
            }
            winnerIsThere = true;
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
    winnerFieldParagraphs.forEach(p => {
        p.style.color = "white";
    });

    winnerParagraph.style.color = bgColor;
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
        div.style.backgroundColor = "white";
        div.style.poleterEvents = "auto";
    });

    Board = [, , , , , , , ,];
    TurnX = true;
    idCounterX = 0;
    idCounterO = 0;
    winnerIsThere = false;
    TurnToPlay();
}

function DaLiJeX(mesto) {
    if (Board[mesto] != null) {
        if (Board[mesto].Mark == 'X')
            return true;
        else
            return false;
    }
    else return false;
}
function DaLiJeOX(mesto) {
    if (Board[mesto] != null) {
        if (Board[mesto] == 'O')
            return true;
        else
            return false;
    }
    else return false;
}

//POCETAK FUNKCIJA KOJE SE POZIVAJU KADA IGRAC KLIKNE NA NEKO POLJE KAKO BI ODIGRAO
//
let brojOdigranih = 0;

function makeAMoveFieldZero() {
    makeAMove(0);
    for (var i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);

    }
    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(2);
    }

    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(6);
    }

    else if (brojOdigranih == 4 && DaLiJeX(2)) {
        makeAMove(1);
    }

    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(1);
    }

    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(3);
    }

    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 4 && DaLiJeX(8)) {
        makeAMove(3);
    }

    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(3);
    }
    if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(7)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(8) && DaLiJeOX(6) == false) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(2) && DaLiJeX(3) && DaLiJeOX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(7) && DaLiJeX(8)) {
        makeAMove(3);
    }
    if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(2);
    }
}

function makeAMoveFieldOne() {
    makeAMove(1);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);
    }
    else if (brojOdigranih == 4 && DaLiJeX(0)) {
        makeAMove(2);
    }

    else if (brojOdigranih == 4 && DaLiJeX(2)) {
        makeAMove(0);
    }

    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 4 && DaLiJeX(4)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 4 && DaLiJeX(8)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(5)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(5)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(2)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(6)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(8)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(3) && DaLiJeX(4) && DaLiJeX(6)) {
        makeAMove(8);

    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(8) && DaLiJeOX(6) == false) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(2) && DaLiJeX(3) && DaLiJeOX(6)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(7) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(4) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(7);
    }
}
function makeAMoveFieldTwo() {
    makeAMove(2);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);
    }

    else if (brojOdigranih == 4 && DaLiJeX(0)) {
        makeAMove(1);
    }

    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(0);
    }

    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(0);
    }

    else if (brojOdigranih == 4 && DaLiJeX(4)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 4 && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(3)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(5)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(3)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(3) && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(8) && DaLiJeX(6)) {
        makeAMove(5);

    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(7) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(6);
    }
}
function makeAMoveFieldThree() {
    makeAMove(3);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);
    }

    else if (brojOdigranih == 4 && DaLiJeX(0)) {
        makeAMove(6);
    }

    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(0);
    }

    else if (brojOdigranih == 4 && DaLiJeX(2)) {
        makeAMove(0);
    }

    else if (brojOdigranih == 4 && DaLiJeX(4)) {
        makeAMove(5);
    }

    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(7);
    }

    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 4 && DaLiJeX(8)) {
        makeAMove(6);
    }

    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(0)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(2)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(2)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(5)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(5)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(2)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(8) && DaLiJeX(6)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(5) && DaLiJeX(0)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(7) && DaLiJeX(8)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(2) && DaLiJeX(4)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(6) && DaLiJeX(4)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(7) && DaLiJeX(4)) {
        makeAMove(5);
    }
}
function makeAMoveFieldFour() {
    makeAMove(4);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(0);
    }

    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(7);
    }

    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(5);
    }

    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(3);
    }

    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(3);
    }
}
function makeAMoveFieldFive() {
    makeAMove(5);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);
    }
    else if (brojOdigranih == 4 && DaLiJeX(0)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 4 && DaLiJeX(2)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 4 && DaLiJeX(4)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 4 && DaLiJeX(8)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(0)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(2)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(2)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(8)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(2)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(8) && DaLiJeX(6)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(6) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(2) && DaLiJeX(4)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(6) && DaLiJeX(4)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(7) && DaLiJeX(4)) {
        makeAMove(3);
    }
}
function makeAMoveFieldSix() {
    makeAMove(6);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);
    }
    else if (brojOdigranih == 4 && DaLiJeX(0)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(0);
    }

    else if (brojOdigranih == 4 && DaLiJeX(2)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 4 && DaLiJeX(4)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 4 && DaLiJeX(8)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(0)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(2)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(2)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(5)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(5)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(5)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(3) && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(7) && DaLiJeX(5)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(8)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(5) && DaLiJeX(0)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(3);
    }
}
function makeAMoveFieldSeven() {
    makeAMove(7);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);
    }

    else if (brojOdigranih == 4 && DaLiJeX(0)) {
        makeAMove(6);
    }

    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(3);
    }

    else if (brojOdigranih == 4 && DaLiJeX(2)) {
        makeAMove(8);
    }

    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(6);
    }

    else if (brojOdigranih == 4 && DaLiJeX(4)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 4 && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(0)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(2)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(2)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(8)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(5)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(8) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(2)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(8)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(3) && DaLiJeX(4) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(2) && DaLiJeX(8)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(8);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(5) && DaLiJeX(0)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(8)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(4) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(1);
    }
}
function makeAMoveFieldEight() {
    makeAMove(8);
    for (let i = 0; i < 9; i++) {
        if (Board[i] != null)
            brojOdigranih++;
    }
    if (brojOdigranih == 1) {
        makeAMove(4);
    }
    else if (brojOdigranih == 4 && DaLiJeX(0)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 4 && DaLiJeX(1)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 4 && DaLiJeX(2)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 4 && DaLiJeX(3)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 4 && DaLiJeX(4)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 4 && DaLiJeX(5)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 4 && DaLiJeX(6)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 4 && DaLiJeX(7)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(0)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(2)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(3)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(2)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(3)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(5)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(0) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(2) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(3)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 9 && DaLiJeX(6) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(2)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 9 && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 9 && DaLiJeX(1) && DaLiJeX(4)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 9 && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(3) && DaLiJeX(4) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(4) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(1) && DaLiJeX(6)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(7) && DaLiJeX(5)) {
        makeAMove(6);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(2) && DaLiJeX(3)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(7)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(0) && DaLiJeX(2) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(6) && DaLiJeX(1) && DaLiJeX(5)) {
        makeAMove(0);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(5)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(7)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(2) && DaLiJeX(4)) {
        makeAMove(3);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(6) && DaLiJeX(4)) {
        makeAMove(5);
    }
    else if (brojOdigranih == 16 && DaLiJeX(1) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(2);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(7);
    }
    else if (brojOdigranih == 16 && DaLiJeX(8) && DaLiJeX(3) && DaLiJeX(4)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(4) && DaLiJeX(5) && DaLiJeX(6)) {
        makeAMove(1);
    }
    else if (brojOdigranih == 16 && DaLiJeX(2) && DaLiJeX(7) && DaLiJeX(4)) {
        makeAMove(3);
    }
}
