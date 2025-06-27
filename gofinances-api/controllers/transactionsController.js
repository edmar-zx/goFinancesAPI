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

exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { titulo, valor, tipo, categoria, data } = req.body;
    try {
        const result = await db.query(
            'UPDATE transacoes SET titulo = $1, valor = $2, tipo = $3, categoria = $4, data = $5 WHERE id = $6 RETURNING *',
            [titulo, valor, tipo, categoria, data, id]
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar transação' });
    }
};

exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'DELETE FROM transacoes WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar transação' });
    }
};
