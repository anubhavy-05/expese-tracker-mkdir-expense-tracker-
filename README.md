# Expense Tracker Project
## 💰 Simple Expense Tracker Web Application

![Status](https://img.shields.io/badge/Status-Complete-green)

---
### Live Demo

[**View Live Application Here**](https://anubhavy-05.github.io/Simple-expense-tracker/)

---
### Project Overview

This is a client-side personal finance application designed to track daily expenses. It provides a clean, responsive interface for recording transactions, calculating a running total, and ensuring data persists across browser sessions.
### Core Features

* **Add Expense:** Users can input the name, amount, and date of a transaction.
* **Delete Expense:** Individual transactions can be removed from the list with a confirmation dialog.
* **Data Persistence:** All expense data is saved directly in the browser using **Local Storage** (no server needed).
* **Real-time Total:** The total amount spent is calculated and updated instantly upon adding or deleting any expense.
* **Input Validation:** Prevents submission of empty fields or zero/negative amounts.
### Technical Bonus: Data Analysis

To demonstrate basic backend/scripting skills, the application includes an "Export Data" feature and a corresponding Python script:

* **Export:** The app converts the stored data into a downloadable **JSON** file.
* **Python Script (`analysis.py`):** This script reads the exported JSON data, performs calculations (total spent, transaction count), and prints a summary report to the console.
### Tech Stack

* **Front-end:** HTML5, CSS3 (Flexbox, Media Queries for responsiveness).
* **Logic:** Vanilla JavaScript (ES6+).
* **Data:** Browser Local Storage (Client-side Data Persistence).
* **Scripting:** Python 3 (JSON handling, basic data aggregation).
### Setup Instructions

1.  Clone this repository to your local machine.
2.  Open the `index.html` file in any modern web browser.

To run the analysis script:
1.  Click the **Export Data (JSON)** button in the app.
2.  Save the `expense_data.json` file into the same directory as `analysis.py`.
3.  Run the script from your terminal: `python analysis.py`
### Potential Future Enhancements

* Add functionality to **Edit** existing expenses.
* Implement **Category Filtering** (e.g., filter by 'Food' or 'Rent').
* Display simple charts or graphs to visualize spending habits.
