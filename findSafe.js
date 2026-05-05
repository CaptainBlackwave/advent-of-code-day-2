const fs = require('fs');

function isReportSafe(report) {
    const diffs = [];
    for (let i = 0; i < report.length - 1; i++) {
        diffs.push(report[i + 1] - report[i]);
    }
    const increasing = diffs.every(d => d >= 1 && d <= 3);
    const decreasing = diffs.every(d => d >= -3 && d <= -1);
    return increasing || decreasing;
}

function isSafeWithDampener(report) {
    if (isReportSafe(report)) {
        return true;
    }
    for (let i = 0; i < report.length; i++) {
        const dampened = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isReportSafe(dampened)) {
            return true;
        }
    }
    return false;
}

function solve() {
    const data = fs.readFileSync('dataSet.txt', 'utf-8');
    const lines = data.trim().split('\n');
    
    let safeCount = 0;
    let dampenedSafeCount = 0;

    for (const line of lines) {
        const levels = line.trim().split(/\s+/).map(Number);
        if (levels.length === 0) continue;
        
        if (isReportSafe(levels)) {
            safeCount++;
        }
        if (isSafeWithDampener(levels)) {
            dampenedSafeCount++;
        }
    }

    console.log(`Total Safe Reports (Original): ${safeCount}`);
    console.log(`Total Safe Reports (With Dampener): ${dampenedSafeCount}`);
}

if (require.main === module) {
    solve();
}

module.exports = { isReportSafe, isSafeWithDampener, solve };