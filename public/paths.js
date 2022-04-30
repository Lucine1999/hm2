// the output should be true
const roadRegister1 = [
    [false, true, false, false],
    [false, false, true, false],
    [true, false, false, true],
    [false, false, true, false],
];

// the output should be true
const roadRegister2 = [
    [false, true, false, false, false, false, false],
    [true, false, false, false, false, false, false],
    [false, false, false, true, false, false, false],
    [false, false, true, false, false, false, false],
    [false, false, false, false, false, false, true],
    [false, false, false, false, true, false, false],
    [false, false, false, false, false, true, false],
];

// the output should be false
const roadRegister3 = [
    [false, true, false],
    [false, false, false],
    [true, false, false],
];

const roadRegister4 = [
    [false, false],
    [false, false, false],
    [false, false, false],
];

const roadRegister5 = [
    [true, false, false],
    [false, true, false],
    [false, false, true],
];

function solution(roadRegister) {
    let countOut;
    let countIn;
    const rowLength = roadRegister.length;

    for (let i = 0; i < rowLength; i++) {
        const colLength = roadRegister[i].length;
        if (rowLength !== colLength) {
            throw new TypeError("Wrong roadRegister given");
        }
        countOut = 0;
        countIn = 0;
        for (let j = 0; j < colLength; j++) {
            if (i === j) {
                if (roadRegister[i][j]) {
                    throw new TypeError("Wrong roadRegister given");
                }
            }

            if (roadRegister[i][j]) {
                countOut++;
            }
            if (roadRegister[j][i]) {
                countIn++;
            }
        }
        if (countOut !== countIn || countIn === 0 || countOut === 0) {
            return false;
        }
    }
    return true;
}

console.log(solution(roadRegister1)); //true
console.log(solution(roadRegister2)); //true
console.log(solution(roadRegister3)); //false
// console.log(solution(roadRegister4)); //TypeError
// console.log(solution(roadRegister5)); //TypeError
