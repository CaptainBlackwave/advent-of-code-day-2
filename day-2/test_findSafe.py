"""
Comprehensive tests for Advent of Code 2024 Day 2 - findSafe.py
"""
from findSafe import is_report_safe, is_safe_with_dampener


class TestFindSafe:
    """Tests for findSafe.py - Advent of Code 2024 Day 2"""

    # ── Part 1: is_report_safe ──────────────────────────────────────

    def test_increasing_safe(self):
        """Strictly increasing by 1-3 each step"""
        assert is_report_safe([1, 2, 3, 4, 5]) is True
        assert is_report_safe([1, 3, 6, 7, 9]) is True
        assert is_report_safe([1, 4, 7, 10]) is True

    def test_decreasing_safe(self):
        """Strictly decreasing by 1-3 each step"""
        assert is_report_safe([5, 4, 3, 2, 1]) is True
        assert is_report_safe([9, 7, 6, 4, 1]) is True
        assert is_report_safe([10, 7, 4, 1]) is True

    def test_no_change_unsafe(self):
        """Adjacent equal values are unsafe"""
        assert is_report_safe([1, 1, 2, 3]) is False
        assert is_report_safe([5, 5, 5]) is False

    def test_big_gap_unsafe(self):
        """Gap > 3 is unsafe"""
        assert is_report_safe([1, 5, 6, 7]) is False
        assert is_report_safe([10, 6, 5, 4]) is False

    def test_direction_change_unsafe(self):
        """Changing from increasing to decreasing is unsafe"""
        assert is_report_safe([1, 2, 1, 2]) is False
        assert is_report_safe([3, 2, 3, 4]) is False

    def test_single_gap_zero_unsafe(self):
        """Gap of exactly 0 (no change) is unsafe"""
        assert is_report_safe([1, 2, 2, 3]) is False
        assert is_report_safe([7, 6, 6, 5]) is False

    def test_minimum_length(self):
        """Reports with fewer than 2 elements are trivially safe (no diffs)"""
        assert is_report_safe([5]) is True
        assert is_report_safe([42]) is True

    def test_two_elements_safe(self):
        """Two elements with diff 1-3 in either direction"""
        assert is_report_safe([1, 4]) is True
        assert is_report_safe([4, 1]) is True
        assert is_report_safe([5, 8]) is True
        assert is_report_safe([8, 5]) is True

    def test_two_elements_unsafe(self):
        """Two elements with diff 0 or > 3"""
        assert is_report_safe([1, 1]) is False
        assert is_report_safe([1, 5]) is False
        assert is_report_safe([10, 6]) is False

    # ── AoC Official Examples (Part 1) ─────────────────────────────

    def test_aoc_example_safe_reports(self):
        """AoC example: [7,6,4,2,1] and [1,3,6,7,9] are safe"""
        assert is_report_safe([7, 6, 4, 2, 1]) is True
        assert is_report_safe([1, 3, 6, 7, 9]) is True

    def test_aoc_example_unsafe_reports(self):
        """AoC example: the other 4 are unsafe without dampener"""
        assert is_report_safe([1, 2, 7, 8, 9]) is False
        assert is_report_safe([9, 7, 6, 2, 1]) is False
        assert is_report_safe([1, 3, 2, 4, 5]) is False
        assert is_report_safe([8, 6, 4, 4, 1]) is False

    # ── Part 2: is_safe_with_dampener ───────────────────────────────

    def test_dampener_safe_already(self):
        """Already safe reports stay safe"""
        assert is_safe_with_dampener([1, 2, 3, 4, 5]) is True
        assert is_safe_with_dampener([7, 6, 4, 2, 1]) is True

    def test_dampener_fixes_single_bad_level(self):
        """Removing the middle element 3 fixes [1,3,2,4,5]"""
        assert is_safe_with_dampener([1, 3, 2, 4, 5]) is True

    def test_dampener_fixes_duplicate(self):
        """Removing one of the duplicate 4s fixes [8,6,4,4,1]"""
        assert is_safe_with_dampener([8, 6, 4, 4, 1]) is True

    def test_dampener_cannot_fix(self):
        """[1,2,7,8,9] and [9,7,6,2,1] cannot be fixed"""
        assert is_safe_with_dampener([1, 2, 7, 8, 9]) is False
        assert is_safe_with_dampener([9, 7, 6, 2, 1]) is False

    def test_dampener_remove_first(self):
        """Removing first element can make it safe"""
        assert is_safe_with_dampener([5, 1, 2, 3, 4]) is True

    def test_dampener_remove_last(self):
        """Removing last element can make it safe"""
        assert is_safe_with_dampener([1, 2, 3, 4, 10]) is True

    def test_dampener_remove_duplicate_adjacent(self):
        """Removing one of adjacent equals (e.g. [1,2,2,1] -> remove middle 2 -> [1,2,1] but still not strictly monotonic)"""
        # [1,2,3,3,4] -> remove one 3 -> [1,2,3,4] -> safe
        assert is_safe_with_dampener([1, 2, 3, 3, 4]) is True

    def test_dampener_remove_first_when_bad_start(self):
        """First level can be the bad one"""
        # [10,1,2,3,4] -> remove 10 -> [1,2,3,4] -> safe
        assert is_safe_with_dampener([10, 1, 2, 3, 4]) is True

    def test_dampener_edge_two_elements(self):
        """Two elements: always safe with dampener if safe, or can remove one to get single"""
        assert is_safe_with_dampener([1, 1]) is True   # remove either -> [1] (trivially safe)
        assert is_safe_with_dampener([1, 5]) is True    # remove either -> [1] or [5]
        assert is_safe_with_dampener([1, 4]) is True    # already safe

    def test_dampener_single_element(self):
        """Single element is always safe"""
        assert is_safe_with_dampener([5]) is True

    # ── AoC Official Examples (Part 2) ─────────────────────────────

    def test_aoc_example_part2(self):
        """AoC example: Part 2 should count 4 safe with dampener"""
        reports = [
            [7, 6, 4, 2, 1],  # safe
            [1, 2, 7, 8, 9],  # unsafe
            [9, 7, 6, 2, 1],  # unsafe
            [1, 3, 2, 4, 5],  # safe with dampener
            [8, 6, 4, 4, 1],  # safe with dampener
            [1, 3, 6, 7, 9],  # safe
        ]
        safe_count = sum(1 for r in reports if is_safe_with_dampener(r))
        assert safe_count == 4

    # ── Edge Cases from dataSet.txt ─────────────────────────────────

    def test_dataset_line1(self):
        """Line 1: [65,68,71,72,71] - not safe, but safe with dampener"""
        assert is_report_safe([65, 68, 71, 72, 71]) is False
        assert is_safe_with_dampener([65, 68, 71, 72, 71]) is True

    def test_dataset_line2(self):
        """Line 2: [31,34,36,37,37] - not safe, but safe with dampener"""
        assert is_report_safe([31, 34, 36, 37, 37]) is False
        assert is_safe_with_dampener([31, 34, 36, 37, 37]) is True

    def test_dataset_line3(self):
        """Line 3: [80,83,84,86,87,90,92,96] - gap 96-92=4 at end, but safe with dampener"""
        assert is_report_safe([80, 83, 84, 86, 87, 90, 92, 96]) is False
        assert is_safe_with_dampener([80, 83, 84, 86, 87, 90, 92, 96]) is True

    def test_dataset_last_line(self):
        """Last line: [37,34,31,29,27,25,22,19] - strictly decreasing by 3,2,2,2,2,3,3 -> safe"""
        assert is_report_safe([37, 34, 31, 29, 27, 25, 22, 19]) is True
        assert is_safe_with_dampener([37, 34, 31, 29, 27, 25, 22, 19]) is True