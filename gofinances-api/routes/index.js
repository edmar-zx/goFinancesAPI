const express = require('express');
const router = express.Router();

const transactionsRoutes = require('./transactions');

router.use('/transactions', transactionsRoutes);

module.exports = router;