def is_report_safe(report):
    """
    Checks if a report is safe based on two rules:
    1. The levels are either all increasing or all decreasing.
    2. Any two adjacent levels differ by at least 1 and at most 3.
    """
    # Calculate differences between adjacent levels
    diffs = [report[i+1] - report[i] for i in range(len(report) - 1)]

    # Rule 1 & 2 combined:
    # All differences must be in [1, 2, 3] (strictly increasing)
    # OR all differences must be in [-1, -2, -3] (strictly decreasing)
    increasing = all(1 <= d <= 3 for d in diffs)
    decreasing = all(-3 <= d <= -1 for d in diffs)

    return increasing or decreasing

def is_safe_with_dampener(report):
    """
    Checks if a report is safe, or can be made safe by removing 
    exactly one level (the Problem Dampener).
    """
    # If it's already safe, no need to remove anything
    if is_report_safe(report):
        return True

    # Try removing each level one by one
    for i in range(len(report)):
        # Create a new version of the report without the element at index i
        dampened_report = report[:i] + report[i+1:]
        
        if is_report_safe(dampened_report):
            return True
            
    return False

def solve():
    safe_count = 0
    dampened_safe_count = 0
    
    # Reading from a file named 'dataSet.txt'
    # To use a raw string instead, replace the 'with' block with your data parsing
    try:
        with open('dataSet.txt', 'r') as file:
            for line in file:
                # Convert the line of text into a list of integers
                levels = list(map(int, line.split()))
                
                if not levels:
                    continue
                
                # Original safety check
                if is_report_safe(levels):
                    safe_count += 1
                
                # Check safety with the Problem Dampener enabled
                if is_safe_with_dampener(levels):
                    dampened_safe_count += 1
                    
        print(f"Total Safe Reports (Original): {safe_count}")
        print(f"Total Safe Reports (With Dampener): {dampened_safe_count}")
        
    except FileNotFoundError:
        print("Error: 'dataSet.txt' not found. Please ensure your data file is in the same folder.")

if __name__ == "__main__":
    solve()