const users = `
CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(250) DEFAULT NULL, 
    email VARCHAR(250) DEFAULT NULL,
    password VARCHAR(250) DEFAULT NULL,
    image TEXTE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`




const accounts = `
CREATE TABLE accounts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(250) DEFAULT NULL, 
    type VARCHAR(50) DEFAULT NULL, -- Bank, Cash, Mobile Money, etc.
    balance REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
)`



const categories = `
CREATE TABLE categories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(250) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
)`


const subcategories = `
CREATE TABLE subcategories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category_name INTEGER NOT NULL,
    name VARCHAR(250) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(category_name) REFERENCES categories(name) ON DELETE CASCADE
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
)`



const transactions = `
CREATE TABLE transactions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    account_name INTEGER NOT NULL,
    type VARCHAR(50) DEFAULT NULL, -- Income or Expense
    amount REAL DEFAULT 0,
    category_name VARCHAR(250) DEFAULT NULL,
    subcategory_name VARCHAR(250) DEFAULT NULL,
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY(category_name) REFERENCES categories(name) ON DELETE SET NULL,
    FOREIGN KEY(subcategory_name) REFERENCES subcategories(name) ON DELETE SET NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
)`


const budgets = `
CREATE TABLE budgets(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category_name INTEGER NOT NULL,
    amount REAL DEFAULT 0, -- Budget limit
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(category_name) REFERENCES categories(name) ON DELETE CASCADE
)`





const tables= {
  users:users,
  accounts:accounts,
  categories:categories,
  subcategories:subcategories,
  transactions:transactions,
  budgets:budgets

  }
  
  
  module.exports = tables