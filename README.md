# WALLET WEB APPLICATION DASHBORD

# Description
wallet web application is an intuitive web application designed to help you manage your personal finances. With features like expense tracking, income visualization, and interactive statistics, this app simplifies daily financial management.



# Features

1. Dashboard
Transaction Chart: Clear visualization of expenses and income by category using an interactive chart.
Key Statistics:
Total balance.
Financial changes for a specific period.
Total expenses.
Total income.

2. Budget Management
Define budgets for specific categories.
Track spending against allocated budgets in real-time.
Receive alerts when spending approaches or exceeds the budget.

3. Authentication
Secure login using an access token.
User sessions managed with localStorage.

4. Account Creation
Users can register and create an account with personal details.
Onboarding process for a seamless setup experience.

5. Category and Subcategory Management
Add and manage expense/income categories.
Create subcategories for detailed financial tracking.
Fully customizable to match user needs.

6. Transaction Management
Record financial transactions with details such as amount, category, date, and description.
Edit or delete transactions as needed.
Filter transactions by type, category, or date for easy tracking.

7. Dynamic Data Retrieval and Display
Integration with an API to fetch transactions and other data.
Dynamic data filtering (e.g., expenses and income).

8. User-Friendly Interface
Smooth navigation with a modern and responsive design.
Comprehensive financial summary with real-time data updates.
Mobile-friendly for on-the-go access.



# Technologies Used
* Frontend:
React.js
Chart.js for data visualization
Material UI
Bootstrap
* Backend:
REST API 
Node js/Express js
* Package Management:
Vite.js for bundling.
Axios for API calls.
Styling:
Custom integrated CSS.



# Installation and Setup
Prerequisites:
Node.js installed on your machine.
Access to a functional REST API instance.

# Installation Steps
1. git clone https://github.com/eray-mutabesha/Wallet-web-application.git

# Usage
* Login:

Log in with your credentials to access the dashboard.
The access token is automatically stored in localStorage for authenticated requests.
View Data:

Navigate through the dashboard to view charts and transaction statistics.
Navigation:

Use the sidebar to explore different sections of the application.

# Folder Structure
src/: Main folder containing React components.
components/: Reusable components like Header.
pages/: Main pages like Dashboard.
styles/: CSS files for styling.
public/: Static resources.
.env: Environment variables for configuration.
API Endpoints Used
GET /GetTransactionData: Fetches transaction data (categories, amounts, types).


# API Endpoints Used
GET /GetTransactionData: Fetches transaction data (categories, amounts, types).

Sample API Response:
[
  {
    "category_name": "Food",
    "type": "Expense",
    "amount": 150
  },
  {
    "category_name": "Salary",
    "type": "Income",
    "amount": 2000
  }
]


# Contributions
Contributions are welcome! If you want to enhance the app or report a bug, please create an issue or submit a pull request.

# License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it.

# Contact
For any questions or suggestions, reach out to us:

Email: eraymutabesha4@gmail.com
![alt text](<public/screenshoot/Capture d’écran du 2025-01-19 11-38-30.png>)

