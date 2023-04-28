// initialization
const resetBtn = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 3;
let winFlag = false;

// create objects as players 
const p1 = {
    score: 0, 
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0, 
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

// take selected winning score 
winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

// update current player score
function updateScore(player, opponent) {
    if(!winFlag) {
        player.score += 1; 
        if(player.score === winningScore) {
            winFlag = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

// players' buttons
p1.button.addEventListener('click', function() {
    updateScore(p1, p2);
})

p2.button.addEventListener('click', function() {
    updateScore(p2, p1);
})

// reset button 
resetBtn.addEventListener('click', function() {
    winFlag = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
})