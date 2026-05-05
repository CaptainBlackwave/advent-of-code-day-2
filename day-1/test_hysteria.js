/**
 * Comprehensive tests for Advent of Code 2024 Day 1 - hysteria.js
 */
const assert = require('assert');
const { calculateTotalDistance, calculateSimilarityScore } = require('./hysteria');

// ── Part 1: calculateTotalDistance ─────────────────────────────────

function test_aoc_example_part1() {
    assert.strictEqual(calculateTotalDistance([3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3]), 11);
    console.log('  ✓ AoC example Part 1 returns 11');
}

function test_all_same() {
    assert.strictEqual(calculateTotalDistance([1, 2, 3], [1, 2, 3]), 0);
    console.log('  ✓ identical lists have distance 0');
}

function test_single_element() {
    assert.strictEqual(calculateTotalDistance([5], [5]), 0);
    assert.strictEqual(calculateTotalDistance([5], [10]), 5);
    console.log('  ✓ single element handles correctly');
}

function test_two_elements() {
    assert.strictEqual(calculateTotalDistance([1, 2], [3, 4]), 4);
    assert.strictEqual(calculateTotalDistance([10, 20], [5, 25]), 10);
    console.log('  ✓ two elements handled correctly');
}

function test_reversed_lists() {
    assert.strictEqual(calculateTotalDistance([3, 1, 2], [6, 5, 4]), 9);
    console.log('  ✓ unsorted lists produce same result after sorting');
}

function test_empty_lists() {
    assert.strictEqual(calculateTotalDistance([], []), 0);
    console.log('  ✓ empty lists return 0');
}

// ── Part 2: calculateSimilarityScore ───────────────────────────────

function test_aoc_example_part2() {
    assert.strictEqual(calculateSimilarityScore([3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3]), 31);
    console.log('  ✓ AoC example Part 2 returns 31');
}

function test_no_matches() {
    assert.strictEqual(calculateSimilarityScore([10, 20, 30], [1, 2, 3]), 0);
    console.log('  ✓ no matches returns 0');
}

function test_all_match_once() {
    assert.strictEqual(calculateSimilarityScore([1, 2, 3], [1, 2, 3]), 6);
    console.log('  ✓ all numbers match once');
}

function test_single_repeated() {
    assert.strictEqual(calculateSimilarityScore([5], [5, 5, 5]), 15);
    console.log('  ✓ single number appears multiple times');
}

function test_mixed_counts() {
    assert.strictEqual(calculateSimilarityScore([1, 2, 3], [1, 1, 2, 2, 2, 3, 3, 3, 3]), 20);
    console.log('  ✓ varying counts handled correctly');
}

function test_duplicates_in_left() {
    assert.strictEqual(calculateSimilarityScore([3, 3, 3], [3, 3, 5]), 18);
    console.log('  ✓ duplicates in left list handled correctly');
}

function test_zero_in_left() {
    assert.strictEqual(calculateSimilarityScore([0, 5], [0, 0, 5]), 5);
    console.log('  ✓ zero in left list handled correctly');
}

function test_empty_lists_similarity() {
    assert.strictEqual(calculateSimilarityScore([], []), 0);
    console.log('  ✓ empty lists return 0');
}

// ── Run All Tests ──────────────────────────────────────────────────

function runTests() {
    console.log('\n🧪 Running hysteria.js tests...\n');

    console.log('Part 1 - calculateTotalDistance:');
    test_aoc_example_part1();
    test_all_same();
    test_single_element();
    test_two_elements();
    test_reversed_lists();
    test_empty_lists();

    console.log('\nPart 2 - calculateSimilarityScore:');
    test_aoc_example_part2();
    test_no_matches();
    test_all_match_once();
    test_single_repeated();
    test_mixed_counts();
    test_duplicates_in_left();
    test_zero_in_left();
    test_empty_lists_similarity();

    console.log('\n✅ All tests passed!');
}

runTests();