const db = require('../db');

exports.getMonthlySummary = async (req, res) => {
    const { year, month } = req.query;

    try {
        const result = await db.query(`
            SELECT
                SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END) AS total_entrada,
                SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END) AS total_saida,
                MAX(CASE WHEN tipo = 'entrada' THEN data ELSE NULL END) AS ultima_entrada_data,
                MAX(CASE WHEN tipo = 'saida' THEN data ELSE NULL END) AS ultima_saida_data
            FROM transacoes
            WHERE EXTRACT(YEAR FROM data) = $1 AND EXTRACT(MONTH FROM data) = $2
        `, [year, month]);

        const row = result.rows[0];

        // Calcula total geral (entrada - saida)
        const total = (row.total_entrada || 0) - (row.total_saida || 0);

        res.json({
            entrada: parseFloat(row.total_entrada) || 0,
            saida: parseFloat(row.total_saida) || 0,
            total,
            ultima_entrada_data: row.ultima_entrada_data,
            ultima_saida_data: row.ultima_saida_data
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter resumo mensal' });
    }
}