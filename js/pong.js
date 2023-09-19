
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Inicialização das variáveis
const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const winningScore = 5; // Pontuação necessária para vencer
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let player1DY = 0;
let player2DY = 0;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 5;
let ballDY = 5;
let player1Score = 0;
let player2Score = 0;

// Função para desenhar a barra
function drawPaddle(x, y) {
    context.fillStyle = 'white';
    context.fillRect(x, y, paddleWidth, paddleHeight);
}

// Função para desenhar a bola
function drawBall(x, y) {
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(x, y, ballSize, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

// Função para desenhar a pontuação
function drawScore() {
    context.fillStyle = 'white';
    context.font = '30px Arial';
    context.fillText(`Player 1: ${player1Score}`, 50, 50);
    context.fillText(`Player 2: ${player2Score}`, canvas.width - 180, 50);
}

// Função principal de desenho
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Movimento do jogador 1 (teclas W e S)
    player1Y += player1DY;
    if (player1Y < 0) player1Y = 0;
    if (player1Y > canvas.height - paddleHeight) player1Y = canvas.height - paddleHeight;

    // Movimento do jogador 2 (setas para cima e para baixo)
    player2Y += player2DY;
    if (player2Y < 0) player2Y = 0;
    if (player2Y > canvas.height - paddleHeight) player2Y = canvas.height - paddleHeight;

    // Movimento da bola
    ballX += ballDX;
    ballY += ballDY;

    // Colisão da bola com as paredes
    if (ballY < 0 || ballY > canvas.height) {
        ballDY = -ballDY;
    }

    // Colisão da bola com as barras
    if (ballX < paddleWidth) {
        if (ballY > player1Y && ballY < player1Y + paddleHeight) {
            ballDX = -ballDX;
        } else {
            // Ponto para o jogador 2
            player2Score++;
            if (player2Score === winningScore) {
                alert('Player 2 venceu!');
                resetGame();
            } else {
                resetBall();
            }
        }
    } else if (ballX > canvas.width - paddleWidth - ballSize) {
        if (ballY > player2Y && ballY < player2Y + paddleHeight) {
            ballDX = -ballDX;
        } else {
            // Ponto para o jogador 1
            player1Score++;
            if (player1Score === winningScore) {
                alert('Player 1 venceu!');
                resetGame();
            } else {
                resetBall();
            }
        }
    }

    // Desenha as barras e a bola
    drawPaddle(0, player1Y);
    drawPaddle(canvas.width - paddleWidth, player2Y);
    drawBall(ballX, ballY);
    drawScore();

    // Solicita uma nova animação
    requestAnimationFrame(draw);
}

// Lidar com entrada do jogador 1 (teclas W e S)
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        player1DY = -5;
    } else if (event.key === 's') {
        player1DY = 5;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 's') {
        player1DY = 0;
    }
});

// Lidar com entrada do jogador 2 (setas para cima e para baixo)
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        player2DY = -5;
    } else if (event.key === 'ArrowDown') {
        player2DY = 5;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        player2DY = 0;
    }
});

// Função para resetar o jogo
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    resetBall();
}

// Função para resetar a bola
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballDX = 5;
    ballDY = 5;
}

// Iniciar o jogo
draw();