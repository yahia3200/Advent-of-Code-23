import { readFileSync } from "fs";

let res = 0;
const input = readFileSync("input.txt", "utf-8");
const lines = input.split("\n").map(l => l.trim()).filter(l => l.length > 0);
const map: Record<string, { left: string, right: string }> = {};
const instructions = lines[0];
const currentNodes: string[] = [];
const endNodes: string[] = [];
const n = instructions.length;

const gcd = (a: number, b: number): number => {
    if (b == 0) {
        return a;
    }

    return gcd(b, a % b);
}

const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
}

for (let line of lines.slice(1)) {
    line = line.replace(/[(),]/g, "")
    const node = line.split("=")[0].trim();
    const left = line.split("=")[1].trim().split(" ")[0];
    const right = line.split("=")[1].trim().split(" ")[1];
    map[node] = { left, right };

    if (node[2] == "A") {
        currentNodes.push(node);
    }

    if (node[2] == "Z") {
        endNodes.push(node);
    }
}

let i = 0;
const cycles: number[] = [];

for (let j = 0; j < currentNodes.length; j++) {
    i = 0;
    let cycle = 0;
    let start = -1;
    let end = -1;

    while (true) {
        const instruction = instructions[i];
        const { left, right } = map[currentNodes[j]];
        if (instruction === "L") {
            currentNodes[j] = left;
        } else {
            currentNodes[j] = right;
        }


        if (endNodes.includes(currentNodes[j])) {
            if (start == -1) {
                start = cycle;
            } else {
                end = cycle;
                cycles.push(end - start);
                break;
            }
        }

        i = (i + 1) % n;
        cycle++;
    }
}

res = cycles.reduce((a, b) => lcm(a, b));

console.log(res);