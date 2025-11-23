"""
EXPENSE TRACKER DATA ANALYSIS SCRIPT

This script reads exported JSON data from the web app, 
calculates key statistics, and demonstrates basic Python data handling skills.
"""
import json

FILE_NAME = 'expense_data.json' # Change this if your downloaded file name is different

# 1. READ THE DATA
try:
    with open(FILE_NAME, 'r') as f:
        expenses = json.load(f)
except FileNotFoundError:
    print(f"Error: File '{FILE_NAME}' not found. Please export data first.")
    exit()
except json.JSONDecodeError:
    print(f"Error: '{FILE_NAME}' is not a valid JSON file.")
    exit()
    # 2. PERFORM ANALYSIS

# Calculate the total sum
total_spent = sum(item['amount'] for item in expenses)

# Find the number of transactions
num_transactions = len(expenses)

# 3. PRINT SUMMARY
print("\n--- Expense Analysis Summary ---")
print(f"Total Transactions: {num_transactions}")
print(f"Total Amount Spent: ${total_spent:.2f}")
print("------------------------------")