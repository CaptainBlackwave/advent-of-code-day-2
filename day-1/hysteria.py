def calculate_total_distance(left, right):
    """
    Pair up the smallest numbers from each list, calculate the absolute
    difference between each pair, and sum them all up.
    """
    left_sorted = sorted(left)
    right_sorted = sorted(right)
    return sum(abs(l - r) for l, r in zip(left_sorted, right_sorted))


def calculate_similarity_score(left, right):
    """
    For each number in the left list, multiply it by the number of times
    it appears in the right list, then sum all those products.
    """
    from collections import Counter
    right_counts = Counter(right)
    return sum(num * right_counts.get(num, 0) for num in left)


def solve():
    left = []
    right = []

    try:
        with open('dataSet.txt', 'r') as file:
            for line in file:
                parts = line.strip().split()
                if len(parts) == 2:
                    left.append(int(parts[0]))
                    right.append(int(parts[1]))

        total_distance = calculate_total_distance(left, right)
        similarity_score = calculate_similarity_score(left, right)

        print(f"Total Distance: {total_distance}")
        print(f"Similarity Score: {similarity_score}")

    except FileNotFoundError:
        print("Error: 'dataSet.txt' not found. Please ensure your data file is in the same folder.")


if __name__ == "__main__":
    solve()