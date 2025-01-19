const express= require('express')
const router= express.Router()
const cors=require("cors")

var corsOption ={
      origin: 'https://walletwebapplication.nguvutech.com',
}



const {InsertUserData, CheckingAcount, authenticateToken,GetUserData}=require("../controler/Auth.js")
const { CreateAcount ,getAcountData, DeleteAcountData}=require("../controler/Account.js")
const {InsertCategoriesData,GetCategoriesData,DeleteCategoriesData,UpdateCategoriesData}= require("../controler/Categories.js")
const {InsertSubcategoriesData,GetsubcategoriesData,DeletesubcategoriesData,UpdatesubcategoriesData}= require("../controler/Subcategories.js")
const { CreateBudget,getBudgetData,DeleteBudgetData}=require("../controler/Budget.js")
const {CreateTransaction, GetTransactionData}=require("../controler/transaction.js")


//user routes start
router.post("/InsertUserData",cors(corsOption),InsertUserData)
router.post('/CheckingAcount',cors(corsOption),CheckingAcount);
router.get("/GetUserData",authenticateToken,cors(corsOption),GetUserData)


//accounts routes start
router.post("/CreateAcount",authenticateToken,cors(corsOption),CreateAcount)
router.get("/getAcountData",authenticateToken,cors(corsOption),getAcountData)
router.delete('/DeleteAcountData/:id',authenticateToken,DeleteAcountData);

//Budget routes start
router.post("/CreateBudget",authenticateToken,cors(corsOption),CreateBudget)
router.get("/getBudgetData",authenticateToken,cors(corsOption),getBudgetData)
router.delete('/DeleteBudgetData/:id',authenticateToken,DeleteBudgetData);


//categories routes start
router.post("/InsertCategoriesData",authenticateToken,cors(corsOption),InsertCategoriesData)
router.get("/GetCategoriesData",authenticateToken,cors(corsOption),GetCategoriesData)
router.delete('/DeleteCategoriesData/:id',authenticateToken,DeleteCategoriesData);
router.put('/UpdateCategoriesData/:id',authenticateToken,UpdateCategoriesData);

//Subcategories routes start
router.post("/InsertSubcategoriesData",authenticateToken,cors(corsOption),InsertSubcategoriesData)
router.get("/GetsubcategoriesData",authenticateToken,cors(corsOption),GetsubcategoriesData)
router.delete('/DeletesubcategoriesData/:id',authenticateToken,DeletesubcategoriesData);
router.put('/UpdatesubcategoriesData/:id',authenticateToken,UpdatesubcategoriesData);



//Subcategories routes start
router.post('/CreateTransaction',authenticateToken,cors(corsOption),CreateTransaction);
router.get('/GetTransactionData',authenticateToken,cors(corsOption),GetTransactionData);


module.exports=router