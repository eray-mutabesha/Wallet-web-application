var sqlite3 = require('sqlite3'),TransactionDatabase = require('sqlite3-transactions').TransactionDatabase
const homedir= require ('os').homedir()
const path = require('path')
const dbsource = path.join(homedir,"walletDB.sqlite")
const tables = require('./Tables')
var db = new TransactionDatabase(new sqlite3.Database(dbsource, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE))


db.beginTransaction(function(err,transactions) {

    transactions.run(tables.users,(err)=>{})
    transactions.run(tables.accounts,(err)=>{})
    transactions.run(tables.categories,(err)=>{})
    transactions.run(tables.subcategories,(err)=>{})
    transactions.run(tables.transactions,(err)=>{})
    transactions.run(tables.budgets,(err)=>{})



    transactions.commit(function(err_){
        if (err_) {
            console.log("COMMIT ERROR",err_)
        } else {
            console.log("successful commit")
        }
    })
})

module.exports = db


