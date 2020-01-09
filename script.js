const canvas = document.getElementById("tetris");
const ctx = canvas.getContext('2d');

ctx.scale(20, 20);

// ctx.fillRect(0, 0, 1, 1);

const pieces = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
    ],
    [
        [0, 0, 0],
        [3, 3, 0],
        [0, 3, 3]
    ],
    [
        [0, 0, 0],
        [0, 4, 4],
        [4, 4, 0]
    ],
    [
        [5, 0, 0],
        [5, 0, 0],
        [5, 5, 0]
    ],
    [
        [0, 0, 6],
        [0, 0, 6],
        [0, 6, 6]
    ],
    [
        [0, 0, 0],
        [7, 7, 7],
        [0, 7, 0]
    ]
];
const arena = [];

const player = {
    pos: { x: 0, y: 0 },
    matrix: pieces[3]
}

function drawMatrix(matrix, x, y) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j])
                ctx.fillRect(x + j, y + i, 1, 1);
        }
    }
}

let interval = 1000;
let lastTime = 0;
let count = 0;

function update(time = 0) {

    const dt = time - lastTime;
    lastTime = time;
    count += dt;

    if (count >= interval) {
        player.pos.y++;
        count = 0;
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    drawMatrix(player.matrix, player.pos.x, player.pos.y);

    requestAnimationFrame(update);

}

update();