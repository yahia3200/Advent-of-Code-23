import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf-8");

const lines = input.split("\n");

let sum = 0;

for (let i = 0; i < lines.length; i++) {

    const gameId = Number(lines[i].split(":")[0].split(" ")[1]);
    const games = lines[i].split(":")[1].trim();

    const score = {
        red: 0,
        green: 0,
        blue: 0
    }

    for (let game of games.split(";")) {

        game = game.trim();
        const colors = game.split(',');
        for (let color of colors) {

            color = color.trim();
            const colorName = color.split(' ')[1] as keyof typeof score;
            const colorValue = Number(color.split(' ')[0]);

            score[colorName] = Math.max(score[colorName], colorValue);
        }
    }

    sum += score["red"] * score["green"] * score["blue"];
}

console.log(sum);