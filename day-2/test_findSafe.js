/**
 * Comprehensive tests for Advent of Code 2024 Day 2 - findSafe.js
 */
const assert = require('assert');
const { isReportSafe, isSafeWithDampener } = require('./findSafe');

// ── Part 1: isReportSafe ────────────────────────────────────────────

function test_increasing_safe() {
    assert.strictEqual(isReportSafe([1, 2, 3, 4, 5]), true);
    assert.strictEqual(isReportSafe([1, 3, 6, 7, 9]), true);
    assert.strictEqual(isReportSafe([1, 4, 7, 10]), true);
    console.log('  ✓ increasing sequences are safe');
}

function test_decreasing_safe() {
    assert.strictEqual(isReportSafe([5, 4, 3, 2, 1]), true);
    assert.strictEqual(isReportSafe([9, 7, 6, 4, 1]), true);
    assert.strictEqual(isReportSafe([10, 7, 4, 1]), true);
    console.log('  ✓ decreasing sequences are safe');
}

function test_no_change_unsafe() {
    assert.strictEqual(isReportSafe([1, 1, 2, 3]), false);
    assert.strictEqual(isReportSafe([5, 5, 5]), false);
    console.log('  ✓ equal adjacent values are unsafe');
}

function test_big_gap_unsafe() {
    assert.strictEqual(isReportSafe([1, 5, 6, 7]), false);
    assert.strictEqual(isReportSafe([10, 6, 5, 4]), false);
    console.log('  ✓ gaps > 3 are unsafe');
}

function test_direction_change_unsafe() {
    assert.strictEqual(isReportSafe([1, 2, 1, 2]), false);
    assert.strictEqual(isReportSafe([3, 2, 3, 4]), false);
    console.log('  ✓ direction changes are unsafe');
}

function test_minimum_length() {
    assert.strictEqual(isReportSafe([5]), true);
    assert.strictEqual(isReportSafe([42]), true);
    console.log('  ✓ single-element reports are trivially safe');
}

function test_two_elements() {
    assert.strictEqual(isReportSafe([1, 4]), true);
    assert.strictEqual(isReportSafe([4, 1]), true);
    assert.strictEqual(isReportSafe([1, 1]), false);
    assert.strictEqual(isReportSafe([1, 5]), false);
    assert.strictEqual(isReportSafe([10, 6]), false);
    console.log('  ✓ two-element reports handled correctly');
}

// ── AoC Official Examples (Part 1) ────────────────────────────────

function test_aoc_example_part1() {
    assert.strictEqual(isReportSafe([7, 6, 4, 2, 1]), true);
    assert.strictEqual(isReportSafe([1, 3, 6, 7, 9]), true);
    assert.strictEqual(isReportSafe([1, 2, 7, 8, 9]), false);
    assert.strictEqual(isReportSafe([9, 7, 6, 2, 1]), false);
    assert.strictEqual(isReportSafe([1, 3, 2, 4, 5]), false);
    assert.strictEqual(isReportSafe([8, 6, 4, 4, 1]), false);
    console.log('  ✓ AoC example Part 1 matches (2 safe, 4 unsafe)');
}

// ── Part 2: isSafeWithDampener ──────────────────────────────────────

function test_dampener_safe_already() {
    assert.strictEqual(isSafeWithDampener([1, 2, 3, 4, 5]), true);
    assert.strictEqual(isSafeWithDampener([7, 6, 4, 2, 1]), true);
    console.log('  ✓ already safe reports stay safe');
}

function test_dampener_fixes_bad_level() {
    assert.strictEqual(isSafeWithDampener([1, 3, 2, 4, 5]), true);
    console.log('  ✓ [1,3,2,4,5] fixed by removing middle 3');
}

function test_dampener_fixes_duplicate() {
    assert.strictEqual(isSafeWithDampener([8, 6, 4, 4, 1]), true);
    console.log('  ✓ [8,6,4,4,1] fixed by removing one 4');
}

function test_dampener_cannot_fix() {
    assert.strictEqual(isSafeWithDampener([1, 2, 7, 8, 9]), false);
    assert.strictEqual(isSafeWithDampener([9, 7, 6, 2, 1]), false);
    console.log('  ✓ truly unsafe reports cannot be fixed');
}

function test_dampener_remove_first() {
    assert.strictEqual(isSafeWithDampener([5, 1, 2, 3, 4]), true);
    console.log('  ✓ removing first element can fix report');
}

function test_dampener_remove_last() {
    assert.strictEqual(isSafeWithDampener([1, 2, 3, 4, 10]), true);
    console.log('  ✓ removing last element can fix report');
}

function test_dampener_remove_duplicate_middle() {
    assert.strictEqual(isSafeWithDampener([1, 2, 3, 3, 4]), true);
    console.log('  ✓ removing middle duplicate can fix report');
}

function test_dampener_remove_bad_start() {
    assert.strictEqual(isSafeWithDampener([10, 1, 2, 3, 4]), true);
    console.log('  ✓ removing bad first element fixes report');
}

function test_dampener_two_elements() {
    assert.strictEqual(isSafeWithDampener([1, 1]), true);  // remove either -> [1]
    assert.strictEqual(isSafeWithDampener([1, 5]), true);  // remove either -> [1]
    assert.strictEqual(isSafeWithDampener([1, 4]), true);  // already safe
    console.log('  ✓ two-element edge cases with dampener');
}

function test_dampener_single() {
    assert.strictEqual(isSafeWithDampener([5]), true);
    console.log('  ✓ single element is always safe');
}

// ── AoC Official Examples (Part 2) ────────────────────────────────

function test_aoc_example_part2() {
    const reports = [
        [7, 6, 4, 2, 1],
        [1, 2, 7, 8, 9],
        [9, 7, 6, 2, 1],
        [1, 3, 2, 4, 5],
        [8, 6, 4, 4, 1],
        [1, 3, 6, 7, 9],
    ];
    const safe_count = reports.filter(r => isSafeWithDampener(r)).length;
    assert.strictEqual(safe_count, 4);
    console.log('  ✓ AoC example Part 2 matches (4 safe with dampener)');
}

// ── Edge Cases from dataSet.txt ─────────────────────────────────────

function test_dataset_line1() {
    assert.strictEqual(isReportSafe([65, 68, 71, 72, 71]), false);
    assert.strictEqual(isSafeWithDampener([65, 68, 71, 72, 71]), true);
    console.log('  ✓ dataset line 1: not safe, safe with dampener');
}

function test_dataset_line2() {
    assert.strictEqual(isReportSafe([31, 34, 36, 37, 37]), false);
    assert.strictEqual(isSafeWithDampener([31, 34, 36, 37, 37]), true);
    console.log('  ✓ dataset line 2: not safe, safe with dampener');
}

function test_dataset_line3() {
    assert.strictEqual(isReportSafe([80, 83, 84, 86, 87, 90, 92, 96]), false);
    assert.strictEqual(isSafeWithDampener([80, 83, 84, 86, 87, 90, 92, 96]), true);
    console.log('  ✓ dataset line 3: gap 4 at end, safe with dampener');
}

function test_dataset_last_line() {
    assert.strictEqual(isReportSafe([37, 34, 31, 29, 27, 25, 22, 19]), true);
    assert.strictEqual(isSafeWithDampener([37, 34, 31, 29, 27, 25, 22, 19]), true);
    console.log('  ✓ dataset last line: strictly decreasing, safe');
}

// ── Run All Tests ──────────────────────────────────────────────────

function runTests() {
    console.log('\n🧪 Running findSafe.js tests...\n');

    console.log('Part 1 - isReportSafe:');
    test_increasing_safe();
    test_decreasing_safe();
    test_no_change_unsafe();
    test_big_gap_unsafe();
    test_direction_change_unsafe();
    test_minimum_length();
    test_two_elements();
    test_aoc_example_part1();

    console.log('\nPart 2 - isSafeWithDampener:');
    test_dampener_safe_already();
    test_dampener_fixes_bad_level();
    test_dampener_fixes_duplicate();
    test_dampener_cannot_fix();
    test_dampener_remove_first();
    test_dampener_remove_last();
    test_dampener_remove_duplicate_middle();
    test_dampener_remove_bad_start();
    test_dampener_two_elements();
    test_dampener_single();
    test_aoc_example_part2();

    console.log('\nDataset Edge Cases:');
    test_dataset_line1();
    test_dataset_line2();
    test_dataset_line3();
    test_dataset_last_line();

    console.log('\n✅ All tests passed!');
}

runTests();