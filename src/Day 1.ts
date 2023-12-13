import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8");

const lines = input.split("\n");

const numbers = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

let sum = 0;

for (let i = 0; i < lines.length; i++) {

    const foundNumbers: number[] = [];
    let line = lines[i];

    for (let j = 0; j < line.length; j++) {

        const char = line[j];

        if (char >= "0" && char <= "9") {
            // found a number
            const number = parseInt(char);

            foundNumbers.push(number);
            continue;
        }

        // find if this char is the start of a number
        const number = Object.keys(numbers).find((key) => {
            return line.indexOf(key, j) === j;
        });

        if (number !== undefined) {
            const digit = numbers[number as keyof typeof numbers];
            foundNumbers.push(digit);
        }

    }

    sum += 10 * foundNumbers[0] + foundNumbers[foundNumbers.length - 1]


}

console.log(sum);