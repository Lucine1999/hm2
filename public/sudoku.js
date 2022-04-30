// true
const grid1 = [
    [".", ".", ".", "1", "4", ".", ".", "2", "."],
    [".", ".", "6", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "1", ".", ".", ".", ".", ".", "."],
    [".", "6", "7", ".", ".", ".", ".", ".", "9"],
    [".", ".", ".", ".", ".", ".", "8", "1", "."],
    [".", "3", ".", ".", ".", ".", ".", ".", "6"],
    [".", ".", ".", ".", ".", "7", ".", ".", "."],
    [".", ".", ".", "5", ".", ".", ".", "7", "."],
];

// false
const grid2 = [
    [".", ".", ".", ".", "2", ".", ".", "9", "."],
    [".", ".", ".", ".", "6", ".", ".", ".", "."],
    ["7", "1", ".", ".", "7", "5", ".", ".", "."],
    [".", "7", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "8", "3", ".", ".", "."],
    [".", ".", "8", ".", ".", "7", ".", "6", "."],
    [".", ".", ".", ".", ".", "2", ".", ".", "."],
    [".", "1", ".", "2", ".", ".", ".", ".", "."],
    [".", "2", ".", ".", "3", ".", ".", ".", "."],
];

function getIndex(row, column) {
    return row * 9 + column;
}

function getPossibleNumbers(grid, index) {
    let options = [];
    for (let value = 1; value <= 9; ++value) {
        if (isValid(grid, index, value)) {
            options.push(value);
        }
    }
    return options;
}

function isValid(grid, index, value) {
    const row = Math.floor(index / 9);
    const column = index % 9;

    //column
    for (let rowIndex = 0; rowIndex < 9; ++rowIndex) {
        if (grid[getIndex(rowIndex, column)] == value) {
            return false;
        }
    }

    //row
    for (let columnIndex = 0; columnIndex < 9; ++columnIndex) {
        if (grid[getIndex(row, columnIndex)] == value) {
            return false;
        }
    }

    // 3 × 3 sub-grids
    const rowBegin = Math.floor(row / 3) * 3;
    let columnBegin = Math.floor(column / 3) * 3;
    for (let rowIndex = rowBegin; rowIndex < rowBegin + 3; ++rowIndex) {
        for (
            let columnIndex = columnBegin;
            columnIndex < columnBegin + 3;
            ++columnIndex
        ) {
            if (grid[getIndex(rowIndex, columnIndex)] == value) return false;
        }
    }

    return true;
}

function solveSudoku(mainGrid) {
    function isSolvable(index) {
        while (index < 81 && mainGrid[index]) {
            index += 1;
        }
        if (index === 81) {
            return true;
        }
        const possibleNumbers = getPossibleNumbers(mainGrid, index);
        for (let number of possibleNumbers) {
            mainGrid[index] = number;
            if (isSolvable(index + 1)) {
                return true;
            }
        }
        mainGrid[index] = 0;
        return false;
    }
    const result = {};
    result["solvable"] = isSolvable(0);
    result["matrix"] = mainGrid;
    return result;
}

function solution(grid) {
    console.table(grid);
    const mainGrid = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === ".") {
                mainGrid.push(0);
            } else {
                mainGrid.push(Number(grid[i][j]));
            }
        }
    }

    const { solvable } = solveSudoku(mainGrid);
    return solvable;
}

console.log(solution(grid1)); // true
console.log(solution(grid2)); // false
