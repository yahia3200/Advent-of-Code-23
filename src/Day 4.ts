import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8");

const lines = input.split("\n");
const n = lines.length;
let sum = 0;

const freq: number[] = new Array(n + 1).fill(1);

for (let i = 0; i < lines.length; i++) {

    let line = lines[i].split(":")[1].trim();

    // remove extra spaces
    while (line.includes("  ")) {
        line = line.replace("  ", " ");
    }

    const winingCards = line.split("|")[0].trim().split(" ").map(Number).sort((a, b) => a - b);
    const cards = line.split("|")[1].trim().split(" ").map(Number);
    let currentScore = 0;
    for (const card of cards) {
        if (winingCards.includes(card)) currentScore++;
    }

    for (let j = 1; j <= currentScore; j++) {
        freq[i + j] += freq[i];
    }
}

for (let i = 1; i <= n; i++) {
    //console.log(freq[i]);
    sum += freq[i];
}

console.log(sum);