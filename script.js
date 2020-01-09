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
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
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