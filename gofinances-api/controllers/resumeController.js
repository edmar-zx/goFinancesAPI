const db = require('../db');

exports.getEntriesByCategory = async (req, res) => {
    const { year, month } = req.query;

    try {
        const result = await db.query(`
      SELECT 
        categoria,
        SUM(valor) AS total
      FROM transacoes
      WHERE 
        tipo = 'entrada'
        AND EXTRACT(YEAR FROM data) = $1
        AND EXTRACT(MONTH FROM data) = $2
      GROUP BY categoria
      ORDER BY total DESC
    `, [year, month]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar entradas por categoria' });
    }
};