import { readFileSync } from "fs";

let res = 0;
const input = readFileSync("input.txt", "utf-8");
const lines = input.split("\n").map(l => l.trim()).filter(l => l.length > 0);
type Hand = { hand: string, bid: number };
type HandArr = Array<Hand>;
const hands: HandArr = [];

const strength: Record<string, number> = {
    'J': 0,
    '2': 1,
    '3': 2,
    '4': 3,
    '5': 4,
    '6': 5,
    '7': 6,
    '8': 7,
    '9': 8,
    'T': 9,
    'Q': 11,
    'K': 12,
    'A': 13,
}

function isFiveKind(hand: string): boolean {
    const handArray = hand.split("");
    const card = handArray[0];
    if (handArray.every(c => c === card)) return true;
    // for part 2
    const unique = new Set(handArray);
    if (unique.size === 2 && (unique.has('J'))) return true;
    return false;
}

function isFourKind(hand: string): boolean {
    const handArray = hand.split("").sort();
    if (handArray.filter(c => c === handArray[0]).length === 4 ||
        handArray.filter(c => c === handArray[4]).length === 4) return true;

    // for part 2
    const unique = new Set(handArray);
    // get occurrences of each card
    const occurrences = [...unique].map(c => handArray.filter(h => h === c).length);

    if (unique.size === 3 && (unique.has('J')) && ((Math.max(...occurrences) == 3) ||
        (handArray.filter(h => h === 'J').length == 2))) return true;
    return false;
}

function isFullHouse(hand: string): boolean {
    const handArray = hand.split("").sort();
    if (handArray.filter(c => c === handArray[0]).length === 3 && handArray.filter(c => c === handArray[4]).length === 2 ||
        handArray.filter(c => c === handArray[0]).length === 2 && handArray.filter(c => c === handArray[4]).length === 3)
        return true;

    // for part 2
    const unique = new Set(handArray);

    if (unique.size === 3 && (unique.has('J'))) return true;
    return false;
}

function isThreeKind(hand: string): boolean {
    const handArray = hand.split("").sort();
    if (handArray.filter(c => c === handArray[0]).length === 3 ||
        handArray.filter(c => c === handArray[1]).length === 3 ||
        handArray.filter(c => c === handArray[2]).length === 3)
        return true;

    // for part 2
    const unique = new Set(handArray);

    if (unique.size === 4 && (unique.has('J'))) return true;
    return false;
}

function isTwoPair(hand: string): boolean {
    const handArray = hand.split("");
    return new Set(handArray).size === 3;
}

function isPair(hand: string): boolean {
    const handArray = hand.split("");
    const unique = new Set(handArray);
    if (unique.size === 4) return true;

    // for part 2
    if (unique.size === 5 && (unique.has('J'))) return true;
    return false;
}

function compareSameType(hand1: string, hand2: string): number {
    if (hand1 === hand2) {
        return 0;
    }

    const handArray1 = hand1.split("");
    const handArray2 = hand2.split("");

    for (let i = 0; i < handArray1.length; i++) {
        if (strength[handArray1[i]] > strength[handArray2[i]]) {
            return -1;
        } else if (strength[handArray1[i]] < strength[handArray2[i]]) {
            return 1;
        }
    }

    return 0;

}

for (const line of lines) {
    const [hand, bid] = line.split(" ");
    hands.push({ hand, bid: parseInt(bid) });
}

const types: Array<HandArr> = [[], [], [], [], [], [], []];

for (const hand of hands) {
    if (isFiveKind(hand.hand)) {
        types[0].push(hand);
    } else if (isFourKind(hand.hand)) {
        types[1].push(hand);
    } else if (isFullHouse(hand.hand)) {
        types[2].push(hand);
    } else if (isThreeKind(hand.hand)) {
        types[3].push(hand);
    } else if (isTwoPair(hand.hand)) {
        types[4].push(hand);
    } else if (isPair(hand.hand)) {
        types[5].push(hand);
    } else {
        types[6].push(hand);
    }
}

types.forEach(t => t.sort((a, b) => compareSameType(a.hand, b.hand)));

const bids = types.flat().map(h => h.bid).reverse();
const indexArr = bids.map((b, i) => i + 1);
res = bids.reduce((acc, b, i) => acc + b * indexArr[i], 0);

console.log(res);