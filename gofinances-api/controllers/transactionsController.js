const db = require('../db');

exports.createTransaction = async (req, res) => {
    const { titulo, valor, tipo, categoria } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO transacoes (titulo, valor, tipo, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, valor, tipo, categoria]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar transação' });
    }
};

exports.listTransactions = async (req, res) => {
    const { year, month } = req.query;

    try {
        const result = await db.query(`
            SELECT *
                FROM transacoes
            WHERE EXTRACT(YEAR  FROM data)  = $1
                AND EXTRACT(MONTH FROM data) = $2
            ORDER BY data DESC, id DESC
        `, [year, month]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao listar transações' });
    }
};
