import { readFileSync } from "fs";

let res = 0;
const input = readFileSync("input.txt", "utf-8");
let lines = input.split("\n").map(l => l.trim()).filter(l => l.length > 0);

const directions: Record<string, { dx: number[], dy: number[] }> = {
    '-': { dx: [1, -1], dy: [0, 0] },
    '|': { dx: [0, 0], dy: [1, -1] },
    'L': { dx: [0, 1], dy: [-1, 0] },
    'J': { dx: [0, -1], dy: [-1, 0] },
    '7': { dx: [0, -1], dy: [1, 0] },
    'F': { dx: [0, 1], dy: [1, 0] },
}

const polygon: { x: number, y: number }[] = [];

let start = { x: 0, y: 0 };

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === 'S') {
            start = { x: j, y: i };
        }
    }
}

const visited = new Set<string>();
visited.add(`${start.x},${start.y}`);
polygon.push(start);

start.y -= 1;  // by inspection

while (true) {

    const key = `${start.x},${start.y}`;
    if (visited.has(key)) {
        break;
    }

    visited.add(key);
    polygon.push({ x: start.x, y: start.y });

    const char = lines[start.y][start.x];
    const dir = directions[char];

    if (visited.has(`${start.x + dir.dx[0]},${start.y + dir.dy[0]}`)) {
        start.x += dir.dx[1];
        start.y += dir.dy[1];
    }
    else {
        start.x += dir.dx[0];
        start.y += dir.dy[0];
    }
}

const area = Math.abs(polygon.reduce((a, b, i) => {
    const c = polygon[(i + 1) % polygon.length];
    return a + b.x * c.y - b.y * c.x;
}, 0) / 2);

res = area - polygon.length / 2 + 1;
console.log(res);