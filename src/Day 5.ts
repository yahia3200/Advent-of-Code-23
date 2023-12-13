import { readFileSync } from "fs";
const tdqm = require(`tqdm`);

const input = readFileSync("input.txt", "utf-8");
let res = Infinity

const sourcesGroup: number[][] = [];
const distentionsGroup: number[][] = [];
const lengthsGroup: number[][] = [];

function map(value: number, distentions: number[], sources: number[], lengths: number[]) {
    for (let i = 0; i < distentions.length; i++) {
        if (value <= sources[i] + lengths[i] && value >= sources[i]) {
            return distentions[i] + (value - sources[i]);
        }
    }

    return value;
}

const rows = input.split(":")
    .map((x) => x.trim())
    .map((x) => x.replace(/\r?\n|\r|[a-zA-Z\-]+/g, " ").trim())
    .filter((x) => x.length > 0)

const seeds = rows[0].split(" ").map((x) => parseInt(x));
for (let i = 1; i < rows.length; i++) {
    const rowParsed = rows[i].split(" ").map((x) => parseInt(x));
    const distentions = [];
    const sources = [];
    const lengths = [];

    for (let j = 0; j < rowParsed.length; j += 3) {
        distentions.push(rowParsed[j]);
        sources.push(rowParsed[j + 1]);
        lengths.push(rowParsed[j + 2]);
    }

    sourcesGroup.push(sources);
    distentionsGroup.push(distentions);
    lengthsGroup.push(lengths);
}

const index = Array.from({ length: (seeds.length) / 2 }, (_, i) => i);
for (let i of tdqm(index)) {
    const currentSeedIndex = 2 * i;
    for (let j = 0; j < seeds[currentSeedIndex + 1]; j++) {
        let value = seeds[currentSeedIndex] + j;
        for (let k = 0; k < sourcesGroup.length; k++) {
            value = map(value, distentionsGroup[k], sourcesGroup[k], lengthsGroup[k]);
        }

        res = Math.min(res, value)
    }
}

console.log(res);