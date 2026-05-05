const fs = require('fs');

function calculateTotalDistance(left, right) {
    const leftSorted = [...left].sort((a, b) => a - b);
    const rightSorted = [...right].sort((a, b) => a - b);
    let total = 0;
    for (let i = 0; i < leftSorted.length; i++) {
        total += Math.abs(leftSorted[i] - rightSorted[i]);
    }
    return total;
}

function calculateSimilarityScore(left, right) {
    const rightCounts = {};
    for (const num of right) {
        rightCounts[num] = (rightCounts[num] || 0) + 1;
    }
    let score = 0;
    for (const num of left) {
        score += num * (rightCounts[num] || 0);
    }
    return score;
}

function solve() {
    const data = fs.readFileSync('dataSet.txt', 'utf-8');
    const lines = data.trim().split('\n');
    const left = [];
    const right = [];

    for (const line of lines) {
        const parts = line.trim().split(/\s+/).map(Number);
        if (parts.length === 2) {
            left.push(parts[0]);
            right.push(parts[1]);
        }
    }

    const totalDistance = calculateTotalDistance(left, right);
    const similarityScore = calculateSimilarityScore(left, right);

    console.log(`Total Distance: ${totalDistance}`);
    console.log(`Similarity Score: ${similarityScore}`);
}

if (require.main === module) {
    solve();
}

module.exports = { calculateTotalDistance, calculateSimilarityScore, solve };