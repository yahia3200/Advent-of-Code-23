import { readFileSync } from "fs";

let res = 0;
const input = readFileSync("input.txt", "utf-8");
const lines = input.split("\n").map(l => l.trim()).filter(l => l.length > 0);

function getDifference(arr: number[]): number[] {
    let diff = [];
    for (let i = 1; i < arr.length; i++) {
        diff.push(arr[i] - arr[i - 1]);
    }
    return diff;
}

function getPrediction(arr: number[]): number {
    let diff = getDifference(arr);
    const lastValues: number[] = [diff[diff.length - 1]]

    while (!diff.every((v, i) => v === diff[0])) {
        diff = getDifference(diff);
        lastValues.push(diff[diff.length - 1]);
    }

    return lastValues.reduce((a, b) => a + b, 0) + arr[arr.length - 1];
}

function getHistory(arr: number[]): number {
    let diff = getDifference(arr);
    const firstValues: number[] = [diff[0]]

    while (!diff.every((v, i) => v === diff[0])) {
        diff = getDifference(diff);
        firstValues.push(diff[0]);
    }

    let value = 0;
    for (let i = firstValues.length - 1; i >= 0; i--) {
        value = firstValues[i] - value;
    }

    return arr[0] - value;
}

for (let line of lines) {
    const arr = line.trim().split(" ").map(n => parseInt(n));
    res += getHistory(arr);
}

console.log(res);