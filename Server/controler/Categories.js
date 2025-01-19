let db = require('../dataBase/Index');

//post data from categories table
async function InsertCategoriesData(req, res) {
    const { name} = req.body;
    const user_id = req.user.id; // ID from JWT

    db.run("INSERT INTO categories(user_id,name) VALUES(?,?)",[user_id,name],(err)=>{
        if (err) {
            console.log("SQL Error: ", err);
            res.json({
                message:"ERRER SERVER",
                status:500,
                err
            }) 
        } else {  res.json({
                message:'success',
                status:200
                
            })
        }
    })
}



//get data from categories table
function GetCategoriesData(req,res){
    const user_id = req.user.id; // ID from JWT
    db.all("SELECT * FROM categories WHERE user_id = ? ORDER BY created_at DESC",[user_id],(err,data_from_db)=>{
        if (err) {
            res.json({
                message:err
            }) 
        } else {
            res.json({
                message:' succes',
                data:data_from_db
            })
        }
    })
}

//delete data from categories table
function DeleteCategoriesData(req,res){
    const user_id = req.user.id; // ID from JWT
    const categorieID= req.params.id

    db.run('DELETE FROM categories WHERE id=? AND user_id = ?',[categorieID,user_id],(err)=>{
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


//update data from categories table
function UpdateCategoriesData(req, res) {
    const user_id = req.user.id; // ID from JWT
    const categoriesID= req.params.id
    const { name} = req.body;

    db.run("UPDATE categories SET name = ? WHERE id = ? AND user_id = ? ",[name,categoriesID,user_id],(err) => {
            if (err) {
                console.log("Erreur dans la mise à jour:", err);
                return res.status(500).json({
                    message: "Problème de mise à jour",
                    err,
                    status: 500
                });
            }
            res.json({
                message: 'Mise à jour réussie',
                status: 200,
            });
        }
    );
}




module.exports={
    InsertCategoriesData,
    GetCategoriesData,
    DeleteCategoriesData,
    UpdateCategoriesData
}