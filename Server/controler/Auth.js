const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let db = require('../dataBase/Index')
const multer = require('multer');



async function InsertUserData(req, res) {
    try {
        const { name,email,password} = req.body;

          //Password hashing
            const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run("INSERT INTO users(name,email,password) VALUES(?, ?, ?)",[name,email,hashedPassword],
            function (err) {
                if (err) {
                    console.log("SQL Error: ", err);
                    return res.status(500).json({
                        message: "Error server",
                        status: 500,
                        err,
                    });
                }
                
                // Generate a JWT token for the newly registered user
                const token = jwt.sign({ email: email }, process.env.JWT_SECRET);


                return res.json({
                    message: 'success user created ',
                    token: token,
                });
            }
        );
    } catch (error) {
        console.error("Erreur:", error);
        return res.status(500).json({ message: "Error server", error: error.message });
    }
}









// checking user authentification
function CheckingAcount(req, res){
    const { email,password } = req.body;
     

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      
        if (err) {
            return res.status(500).json({ message: 'Erreur du serveur', error: err });
        }


        if (!user) {
            return res.json({ exists: false, message: 'Email non trouvé' });
        } 
        

        // Comparer le mot de passe fourni avec celui stocké dans la base de données
        const match = await bcrypt.compare(password, user.password);

        if (match) {
             // Créer un jeton JWT valide pour l'utilisateur
             const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET);

            return res.status(200).json({
                exists: true, 
                message: 'Authentification réussie',
                data:user,
                token ,

            });
        } else {
            return res.status(401).json({ exists: false, message: 'Mot de passe incorrect' });
        }

    });
}









// Token's middleware  
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide ou expiré' });
        }

        req.user = user; // Token data
        next();
    });
};




const GetUserData = async (req, res) => {
    const user_id = req.user.id; 

    db.all(
        `SELECT * FROM users WHERE id = ?`,[user_id],(err,data_from_db)=>{
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













module.exports={
    InsertUserData,
    CheckingAcount,
    authenticateToken,
    GetUserData,
}