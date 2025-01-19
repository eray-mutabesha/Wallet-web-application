let db = require('../dataBase/Index');


async function CreateAcount(req, res) {
    const { name,type,balence} = req.body;
    const user_id = req.user.id; // ID from JWT

    db.run("INSERT INTO accounts(user_id,name,type,balance) VALUES(?,?,?,?)",[user_id,name,type,balence],(err)=>{
        if (err) {
            console.log("SQL Error: ", err);
            res.json({
                message:"ERRER SERVER",
                status:500,
                err
            }) 
        } else {  res.json({
                message:'table entre avac succes',
                status:200
                
            })
        }
    })
}






const getAcountData = async (req, res) => {
    const user_id = req.user.id; 

    db.all(
        `SELECT * FROM accounts WHERE user_id = ? ORDER BY created_at DESC`,[user_id],(err,data_from_db)=>{
            if (err) {
                res.json({
                    message:err
                }) 
            } else {
                res.json({
                    message:' sortie effectuer avac succes',
                    data:data_from_db
                })
            }
        }
    );
};


//delete data from categories table
function DeleteAcountData(req,res){
    const user_id = req.user.id; // ID from JWT
    const budgetID= req.params.id

    db.run('DELETE FROM accounts WHERE id=? AND user_id = ?',[budgetID,user_id],(err)=>{
        if (err) {
            console.log(err)
            res.json({
                message:err
            }) 
        } else {
            res.json({
                message:' supression effectuer avac succes',
                
            })
        }
    })
}
module.exports={
CreateAcount,
getAcountData,
DeleteAcountData
}