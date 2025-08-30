const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Colors
const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'];

// Brick size
const brickSize = 30;

// Tetris shapes (example: I-shape)
const shapes = [
    {
        name: 'I',
        color: colors[0],
        matrix: [[1, 1, 1, 1]],
    },
    {
        name: 'O',
        color: colors[1],
        matrix: [[1, 1], [1, 1]],
    },
    {
        name: 'T',
        color: colors[2],
        matrix: [[0, 1, 0], [1, 1, 1]],
    },
    {
        name: 'L',
        color: colors[3],
        matrix: [[1, 0], [1, 0], [1, 1]],
    },
    {
        name: 'J',
        color: colors[4],
        matrix: [[0, 1], [0, 1], [1, 1]],
    },
    {
      name: 'S',
      color: colors[0],
      matrix: [[0, 1, 1], [1, 1, 0]],
    },
    {
      name: 'Z',
      color: colors[1],
      matrix: [[1, 1, 0], [0, 1, 1]],
    }
];

// Initial brick position
let brickX = 50;
let brickY = 50;
let dragging = false;

// Draw the brick
function drawBrick(shape, x, y) {
    ctx.fillStyle = shape.color;
    for (let i = 0; i < shape.matrix.length; i++) {
        for (let j = 0; j < shape.matrix[i].length; j++) {
            if (shape.matrix[i][j]) {
                ctx.fillRect(x + j * brickSize, y + i * brickSize, brickSize, brickSize);
            }
        }
    }
}

// Event listeners for dragging
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if the mouse is inside the brick
    if (mouseX >= brickX && mouseX <= brickX + brickSize * shapes[0].matrix[0].length &&
        mouseY >= brickY && mouseY <= brickY + brickSize * shapes[0].matrix.length) {
        dragging = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (dragging) {
        const rect = canvas.getBoundingClientRect();
        brickX = e.clientX - rect.left - brickSize;
        brickY = e.clientY - rect.top - brickSize;
        draw(); // Redraw the scene
    }
});

canvas.addEventListener('mouseup', () => {
    dragging = false;
});

// Main draw function
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the brick
    drawBrick(shapes[0], brickX, brickY);
}

// Initial draw
draw();
