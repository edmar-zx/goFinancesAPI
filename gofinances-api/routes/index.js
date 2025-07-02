const express = require('express');
const router = express.Router();

const transactionsRoutes = require('./transactions');
const highlightCardsRoutes = require('./monthlySummary');
const resumeRoutes = require('./resume')

router.use('/transactions', transactionsRoutes);
router.use('/monthlySummary', highlightCardsRoutes);
router.use('/resume', resumeRoutes);

module.exports = router;