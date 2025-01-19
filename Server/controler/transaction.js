let db = require('../dataBase/Index');

async function CreateTransaction(req, res) {
    const {
        account_id,
        account_name,
        type, // Income ou Expense
        amount,
        category_name,
        subcategory_name,
        description,
    } = req.body;

    const user_id = req.user.id; // ID de l'utilisateur extrait du JWT

    // Valider les données nécessaires
    if (!account_id || !type || !amount) {
        return res.status(400).json({
            message: "Les champs 'account_id', 'type' et 'amount' sont obligatoires.",
            status: 400,
        });
    }

    try {
        // Étape 1 : Vérifier si un budget est défini pour la catégorie
        const checkBudgetQuery = `
            SELECT 
                b.amount AS budget_limit
            FROM budgets b
            WHERE b.user_id = ? AND b.category_name = ?
        `;

        db.get(checkBudgetQuery, [user_id, category_name], (err, row) => {
            if (err) {
                console.error("Erreur SQL lors de la vérification du budget :", err);
                return res.status(500).json({
                    message: "Erreur serveur lors de la vérification du budget.",
                    status: 500,
                    error: err,
                });
            }

            // Si un budget est défini pour cette catégorie
            if (row && row.budget_limit) {
                const budgetLimit = row.budget_limit;

                // Si la transaction est une dépense, vérifier si le budget est suffisant
                if (type === 'Expense') {
                    // Vérifier si le montant de la dépense dépasse le budget
                    if (amount > budgetLimit) {
                        return res.status(400).json({
                            message: `Le budget pour la catégorie '${category_name}' est dépassé.`,
                            status: 400,
                            details: {
                                amount: amount,
                                budget_limit: budgetLimit,
                            }
                        });
                    }

                    // Si la dépense est validée, mettre à jour le budget
                    const updateBudgetQuery = `
                        UPDATE budgets
                        SET amount = amount - ?
                        WHERE user_id = ? AND category_name = ?
                    `;

                    db.run(updateBudgetQuery, [amount, user_id, category_name], function(err) {
                        if (err) {
                            console.error("Erreur lors de la mise à jour du budget :", err);
                            return res.status(500).json({
                                message: "Erreur serveur lors de la mise à jour du budget.",
                                status: 500,
                                error: err,
                            });
                        }
                    });
                }
            } 
            // Étape 2 : Insérer la transaction dans la base de données
            const insertTransactionQuery = `
                INSERT INTO transactions (
                    user_id,
                    account_id,
                    account_name,
                    type,
                    amount,
                    category_name,
                    subcategory_name,
                    description
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(
                insertTransactionQuery,
                [
                    user_id,
                    account_id,
                    account_name,
                    type,
                    amount,
                    category_name,
                    subcategory_name,
                    description,
                ],
                function (err) {
                    if (err) {
                        console.error("Erreur SQL lors de l'insertion de la transaction :", err);
                        return res.status(500).json({
                            message: "Erreur serveur lors de l'insertion de la transaction.",
                            status: 500,
                            error: err,
                        });
                    }

                    // Étape 3 : Mettre à jour le solde du compte
                    const updateBalanceQuery =
                        type.toLowerCase() === "income"
                            ? `UPDATE accounts SET balance = balance + ? WHERE id = ?`
                            : `UPDATE accounts SET balance = balance - ? WHERE id = ?`;

                    db.run(updateBalanceQuery, [amount, account_id], (err) => {
                        if (err) {
                            console.error("Erreur SQL lors de la mise à jour du solde du compte :", err);
                            return res.status(500).json({
                                message: "Erreur serveur lors de la mise à jour du solde du compte.",
                                status: 500,
                                error: err,
                            });
                        }

                        // Succès
                        return res.status(200).json({
                            message: "Transaction enregistrée avec succès.",
                            status: 200,
                        });
                    });
                }
            );
        });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({
            message: "Erreur serveur.",
            status: 500,
            error,
        });
    }
}




const GetTransactionData = async (req, res) => {
    const user_id = req.user.id; 

    db.all(
        `SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC`,[user_id],(err,data_from_db)=>{
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

module.exports = { CreateTransaction,GetTransactionData };
