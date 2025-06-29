const express = require('express');
const router = express.Router();

const transactionsRoutes = require('./transactions');
const resumoMensalRoutes = require('./monthlySummary');

router.use('/transactions', transactionsRoutes);
router.use('/monthlySummary', resumoMensalRoutes);


module.exports = router;