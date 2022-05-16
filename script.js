'use strict';

// gameboard module
const gameBoard = (function() {
    const gameBoardArray = Array.from(document.querySelectorAll('td'));
    console.log('gameBoard was called')
    // but elem.textContent IS empty, why did I write this function? 
    // function render() {
    //     gameBoardArray.forEach(elem => elem.textContent = '');
    //     return gameBoardArray;
    // }

return {
    gameBoardArray,
}
})();

// game controller module
const gameController = (function() {
    const gameboard = gameBoard.gameBoardArray;
})();

// a factory function for creating players
const player = () => {
    const markBtns = Array.from(document.querySelectorAll('.js-choose-mark-btn'));

    function assignMarkComputer() {
        computerPlayer.mark = humanPlayer.mark === 'x' ? 'o' : 'x';
        console.log(`assignMarkComp was called comp ${computerPlayer.mark}`);
    }

    // disable buttons when player selects a mark
    function disableButtons() {
        markBtns.forEach(btn => btn.addEventListener('click', () => {markBtns.forEach(btn => btn.disabled = true)}, false));
    }
    disableButtons();

    return {
        mark: this.mark,
        // do I have to make markBtns public? check later 
        //markBtns,
        chooseMark() {
            markBtns.forEach(btn => btn.addEventListener('click', (e) => {
                this.mark = e.target.id;
                console.log(`chooseMark was called human ${humanPlayer.mark}`);
            }, false));

            // as soon as human selects a mark, computer gets a mark assigned to it
            markBtns.forEach(btn => btn.addEventListener('click', assignMarkComputer, false));
        }
    }
}

//gameBoard.render();

const humanPlayer = player();
const computerPlayer = player();

humanPlayer.chooseMark();


//gameController.makeMoveHuman();
//gameController.makeMoveComputer();

//oh great I broke something. 
//Found a bag. Apparently if randomCell equals 0, computer can make the first move even if its mark is o. Yep, I managed to reproduce it. Wellll, how do I fix it? I suppose the computer thinks that the cell is empty and makes a move. Player, in his turn, sees that the cell is taken and doesn't mark it. I don't like that the functions execute in the wrong order. If not for that, I wouldn't encounter these issues. 
// Umm 'redeclaration of const player'? Where? I commented the whole fucking code and I still get this syntax error. Ooooh I get it now. It's rather funny - I happened to accidentally duplicate the part of the html markup that includes script tag, so I basically tried to open script.js file twice, that's why I kept getting the error on the line 1. Funny stuff actually. 



