import { readFileSync } from "fs";
const tdqm = require(`tqdm`);

let res = 0;
const input = readFileSync("input.txt", "utf-8");
const lines = input.split("\n");

const maxTime = Number(lines[0].split(":")[1].trim().replace(/(\s)+/g, ""))
const maxDistance = Number(lines[1].split(":")[1].trim().replace(/(\s)+/g, ""))

const index = Array.from({ length: maxTime }, (_, i) => i);
for (let i of tdqm(index)) {
    const speed = i;
    const distance = speed * (maxTime - i);
    if (distance > maxDistance) {
        res++;
    }
}


console.log(res);