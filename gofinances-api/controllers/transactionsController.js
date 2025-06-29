const db = require('../db');

exports.createTransaction = async (req, res) => {
    const { titulo, valor, tipo, categoria, data } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO transacoes (titulo, valor, tipo, categoria, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [titulo, valor, tipo, categoria, data]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar transação' });
    }
};

exports.listTransactions = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM transacoes ORDER BY data DESC');
        res.json(result.rows);
    } catch (err) {
        console.log("teste");
        console.log(err);
        res.status(500).json({ error: 'Erro ao listar transações' });
    }
};
