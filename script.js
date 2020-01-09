const canvas = document.getElementById("tetris");
const ctx = canvas.getContext('2d');

const scale = 20;

ctx.scale(scale, scale);

const tWidth = canvas.width / scale;
const tHeight = canvas.height / scale;

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

function rotateMatrix(matrix, dir) {
    let newMatrix = [];

    for (let i in matrix)
        newMatrix.push([]);

    if (dir === 1) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                newMatrix[j][matrix.length - i - 1] = matrix[i][j];
            }
        }
    } else {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                newMatrix[matrix.length - j - 1][i] = matrix[i][j];
            }
        }
    }

    return newMatrix;
}


function initArena() {
    const r = new Array(tWidth + 2).fill(1);
    arena.push(r);

    for (let i = 0; i < tHeight; i++) {
        let row = new Array(tWidth).fill(0);
        row.push(1);
        row.unshift(1);

    }

    arena.push(r);
    arena.push(r);
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

document.addEventListener("keydown", event => {

    if (event.keyCode === 37 && interval - 1) {
        player.pos.x--;
        if (collides(player, arena))
            player.pos.x++;
    } else if (event.keyCode === 39 && interval - 1) {
        player.pos.x++;
        if (collides(player, arena))
            player.pos.x--;
    } else if (event.keyCode === 40) {
        player.pos.y++;
        count = 0;
    } else if (event.keyCode === 38) {
        player.matrix = rotateMatrix(player.matrix, 1);
        if (collides(player, arena))
            player.matrix = rotateMatrix(player.matrix, -1);
    } else if (event.keyCode === 32) {
        interval = 1;
    }

});

initArena();
update();