let playerMode = '';
let player1Choice = '';
let player2Choice = '';

function toggleDarkMode() {
    const randomColor = generateRandomColor();
    const buttons = document.querySelectorAll('.btn');
    const developerName = document.getElementById('developer');
    
    buttons.forEach(button => {
        button.style.backgroundColor = randomColor;
        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = darkenColor(randomColor, 20);
        });
        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = randomColor;
        });
    });
    
    document.body.style.backgroundColor = randomColor;
    developerName.style.color = randomColor;
}

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color, amount) {
    const rgb = color.replace(/[^\d,]/g, '').split(',');
    const darkenedRGB = rgb.map(component => Math.max(parseInt(component) - amount, 0));
    return `rgb(${darkenedRGB.join(',')})`;
}

function selectPlayerMode(mode) {
    playerMode = mode;
    if (mode === 'computer' || mode === 'player') {
        document.getElementById('game-container').style.display = 'block';
        document.getElementById('game-selector').style.display = 'none';
        if (mode === 'player') {
            document.getElementById('player1').style.display = 'block';
            document.getElementById('player2').style.display = 'none';
            document.getElementById('computer-mode').style.display = 'none';
        } else {
            document.getElementById('player1').style.display = 'none';
            document.getElementById('player2').style.display = 'none';
            document.getElementById('computer-mode').style.display = 'block';
        }
    }
}

function playGame(playerChoice, playerNumber) {
    if (playerMode === 'player') {
        if (playerNumber === 1) {
            player1Choice = playerChoice;
            document.getElementById('player1').style.display = 'none';
            document.getElementById('player2').style.display = 'block';
        } else if (playerNumber === 2) {
            player2Choice = playerChoice;
            let resultText;
            if (player1Choice === player2Choice) {
                resultText = "It's a draw!";
            } else if (
                (player1Choice === 'rock' && player2Choice === 'scissors') ||
                (player1Choice === 'paper' && player2Choice === 'rock') ||
                (player1Choice === 'scissors' && player2Choice === 'paper')
            ) {
                resultText = "Player 1 wins!";
            } else {
                resultText = "Player 2 wins!";
            }
            document.getElementById('result').innerText = `Player 1 chose ${player1Choice}, Player 2 chose ${player2Choice}. ${resultText}`;
            player1Choice = '';
            player2Choice = '';
            document.getElementById('player1').style.display = 'block';
            document.getElementById('player2').style.display = 'none';
        }
    } else if (playerMode === 'computer') {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        let resultText;

        if (playerChoice === computerChoice) {
            resultText = "It's a draw!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            resultText = "You win!";
        } else {
            resultText = "Computer wins!";
        }

        document.getElementById('result').innerText = `You chose ${playerChoice}, Computer chose ${computerChoice}. ${resultText}`;
    }
}
