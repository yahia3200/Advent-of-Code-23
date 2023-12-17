import { readFileSync } from "fs";

let res = 0;
const input = readFileSync("input.txt", "utf-8");
const lines = input.split("\n").map(l => l.trim()).filter(l => l.length > 0);

const n = lines.length;
const m = lines[0].length;

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const emptyCost = 1000000;
let rowCosts: number[] = [];
let colCosts: number[] = [];

const distances: Record<string, number> = {};

// utility functions

const valid = (x: number, y: number) => x >= 0 && x < n && y >= 0 && y < m;

const hash = (pos1: { x: number, y: number }, pos2: { x: number, y: number }) => {
    if (pos1.x < pos2.x) {
        return `${pos1.x},${pos1.y}-${pos2.x},${pos2.y}`;

    } else if (pos1.x > pos2.x) {
        return `${pos2.x},${pos2.y}-${pos1.x},${pos1.y}`;
    }
    if (pos1.y < pos2.y) {
        return `${pos1.x},${pos1.y}-${pos2.x},${pos2.y}`;

    } else if (pos1.y > pos2.y) {
        return `${pos2.x},${pos2.y}-${pos1.x},${pos1.y}`;
    }
    return "";
}

// main dfs function to calculate distance between two #
const dfs = (start: { x: number, y: number }, pos: { x: number, y: number }, visited: boolean[][]) => {

    const queue: { x: number, y: number, dist: number }[] = [{ x: pos.x, y: pos.y, dist: 0 }];
    while (queue.length > 0) {
        const { x, y, dist } = queue.shift()!;
        const h = hash(start, { x, y });
        if (lines[x][y] === "#" && distances[h] === undefined) {
            distances[h] = dist;
            res += dist;
        }
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (valid(nx, ny) && !visited[nx][ny]) {
                if (dx[i] === 0) {
                    queue.push({ x: nx, y: ny, dist: dist + colCosts[ny] });
                } else {
                    queue.push({ x: nx, y: ny, dist: dist + rowCosts[nx] });
                }
                visited[nx][ny] = true;
            }
        }
    }

}

// calculate costs for rows and columns

for (let i = 0; i < n; i++) {
    if (lines[i].indexOf("#") === -1) {
        rowCosts[i] = emptyCost;
    } else {
        rowCosts[i] = 1;
    }
}


for (let i = 0; i < m; i++) {
    let hasHash = false;
    for (let j = 0; j < n; j++) {
        if (lines[j][i] === "#") {
            hasHash = true;
            break;
        }
    }
    if (!hasHash) {
        colCosts[i] = emptyCost;
    } else {
        colCosts[i] = 1;
    }
}

// find all # and run dfs from each of them
const starts = [];
for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        if (lines[i][j] === "#") {
            starts.push({ x: i, y: j });
        }
    }
}

for (const start of starts) {
    let visited: boolean[][] = [];
    for (let i = 0; i < n; i++) {
        visited[i] = [];
        for (let j = 0; j < m; j++) {
            visited[i][j] = false;
        }
    }

    dfs(start, start, visited);
}

console.log(res);