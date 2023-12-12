import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8");

const lines = input.split("\n");
const n = lines.length;
const m = lines[0].trim().length;
console.log(n, m);

let sum = 0;
const Gears = new Map<string, number[]>();

function isNumber(c: string): boolean {
    return c >= '0' && c <= '9';
}

function isGear(c: string): boolean {
    if (c == '*') return true;
    return false;
}


function checkIfValid(i: number, j: number, isMiddle: boolean, isStart: boolean) {
    if (i > 0 && isGear(lines[i - 1][j])) return { i: i - 1, j };
    if (i < n - 1 && isGear(lines[i + 1][j])) return { i: i + 1, j };
    if (j > 0 && isGear(lines[i][j - 1])) return { i, j: j - 1 };
    if (j < m - 1 && isGear(lines[i][j + 1])) return { i, j: j + 1 };

    if (isMiddle) return null;

    if (isStart) {
        if (i > 0 && j > 0 && isGear(lines[i - 1][j - 1])) return { i: i - 1, j: j - 1 };
        if (i < n - 1 && j > 0 && isGear(lines[i + 1][j - 1])) return { i: i + 1, j: j - 1 };

    }
    else {
        if (i > 0 && j < m - 1 && isGear(lines[i - 1][j + 1])) return { i: i - 1, j: j + 1 };
        if (i < n - 1 && j < m - 1 && isGear(lines[i + 1][j + 1])) return { i: i + 1, j: j + 1 };

    }

    return null;
}

type GearType = {
    i: number,
    j: number
}


for (let i = 0; i < n; i++) {
    const line = lines[i].trim();
    let currentValue = "";
    let currentGear: GearType | null = null;
    let start = 0;

    for (let j = 0; j < m; j++) {
        const c = line[j];
        if (isNumber(c)) {
            currentValue += c;

            if (checkIfValid(i, j, true, false)) {
                currentGear = checkIfValid(i, j, true, false);
            }
        }
        else {
            if (currentValue != "") {
                if (checkIfValid(i, j - 1, false, false)) {
                    currentGear = checkIfValid(i, j - 1, false, false);
                }
                else if (checkIfValid(i, start, false, true)) {
                    currentGear = checkIfValid(i, start, false, true);
                }

                if (currentGear) {
                    const key = currentGear.i + " " + currentGear.j;
                    const arr = Gears.get(key);
                    if (arr) {
                        arr.push(parseInt(currentValue));
                        Gears.set(key, arr);
                    }
                    else {
                        Gears.set(key, [parseInt(currentValue)]);
                    }
                }


            }
            currentValue = "";
            start = j + 1;
            currentGear = null;

        }



    }

    if (currentValue != "") {
        if (checkIfValid(i, m - 1, false, false)) {
            currentGear = checkIfValid(i, m - 1, false, false);
        }
        else if (checkIfValid(i, start, false, true)) {
            currentGear = checkIfValid(i, start, false, true);
        }

        if (currentGear != null) {
            //console.log(currentGear, currentValue);
            const key = currentGear.i + " " + currentGear.j;
            const arr = Gears.get(key);
            if (arr) {
                arr.push(parseInt(currentValue));
                Gears.set(key, arr);
            }
            else {
                Gears.set(key, [parseInt(currentValue)]);
            }
        }


    }
}

for (const [key, value] of Gears.entries()) {
    if (value.length == 2) {
        //console.log(key, value)
        sum += value[0] * value[1];
    }
}

console.log(sum);