"""
Comprehensive tests for Advent of Code 2024 Day 1 - hysteria.py
"""
from hysteria import calculate_total_distance, calculate_similarity_score


class TestHysteria:
    """Tests for hysteria.py - Advent of Code 2024 Day 1"""

    # ── Part 1: calculate_total_distance ────────────────────────────

    def test_aoc_example_part1(self):
        """AoC example: should return 11"""
        left = [3, 4, 2, 1, 3, 3]
        right = [4, 3, 5, 3, 9, 3]
        assert calculate_total_distance(left, right) == 11

    def test_all_same(self):
        """Both lists identical -> distance 0"""
        assert calculate_total_distance([1, 2, 3], [1, 2, 3]) == 0

    def test_single_element(self):
        """Single element in each list"""
        assert calculate_total_distance([5], [5]) == 0
        assert calculate_total_distance([5], [10]) == 5

    def test_two_elements(self):
        """Two elements in each list"""
        assert calculate_total_distance([1, 2], [3, 4]) == 4  # |1-3| + |2-4| = 2 + 2 = 4
        assert calculate_total_distance([10, 20], [5, 25]) == 10  # |10-5| + |20-25| = 5 + 5 = 10

    def test_negative_numbers(self):
        """Lists can contain negative numbers"""
        assert calculate_total_distance([-5, 0, 5], [-3, 0, 3]) == 6  # |-5-(-3)| + |0-0| + |5-3| = 2 + 0 + 2 = 4

    def test_large_gap(self):
        """Large gaps between paired numbers"""
        assert calculate_total_distance([10, 100], [1, 1000]) == 1089  # |10-1| + |100-1000| = 9 + 900 = 909

    def test_reversed_lists(self):
        """List order doesn't matter due to sorting"""
        left = [3, 1, 2]
        right = [6, 5, 4]
        assert calculate_total_distance(left, right) == 9  # |1-4| + |2-5| + |3-6| = 3 + 3 + 3 = 9

    def test_empty_lists(self):
        """Empty lists should return 0"""
        assert calculate_total_distance([], []) == 0

    # ── Part 2: calculate_similarity_score ─────────────────────────

    def test_aoc_example_part2(self):
        """AoC example: should return 31"""
        left = [3, 4, 2, 1, 3, 3]
        right = [4, 3, 5, 3, 9, 3]
        assert calculate_similarity_score(left, right) == 31

    def test_no_matches(self):
        """No numbers from left appear in right -> score 0"""
        left = [10, 20, 30]
        right = [1, 2, 3]
        assert calculate_similarity_score(left, right) == 0

    def test_all_match_once(self):
        """Each left number appears once in right"""
        left = [1, 2, 3]
        right = [1, 2, 3]
        assert calculate_similarity_score(left, right) == 1 + 2 + 3  # 6

    def test_single_repeated(self):
        """One left number appears many times in right"""
        left = [5]
        right = [5, 5, 5]
        assert calculate_similarity_score(left, right) == 15  # 5 * 3

    def test_mixed_counts(self):
        """Left numbers appear varying times in right"""
        left = [1, 2, 3]
        right = [1, 1, 2, 2, 2, 3, 3, 3, 3]
        # 1*2 + 2*3 + 3*4 = 2 + 6 + 12 = 20
        assert calculate_similarity_score(left, right) == 20

    def test_duplicates_in_left(self):
        """Left list has duplicates"""
        left = [3, 3, 3]
        right = [3, 3, 5]
        # 3*2 + 3*2 + 3*2 = 18
        assert calculate_similarity_score(left, right) == 18

    def test_zero_in_left(self):
        """Zero in left list"""
        left = [0, 5]
        right = [0, 0, 5]
        assert calculate_similarity_score(left, right) == 5  # 0*2 + 5*1 = 5

    def test_empty_lists_similarity(self):
        """Empty lists should return 0"""
        assert calculate_similarity_score([], []) == 0