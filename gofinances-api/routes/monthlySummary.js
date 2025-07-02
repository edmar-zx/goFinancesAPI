const express = require('express');
const router = express.Router();
const highlightCardController = require('../controllers/highlightCardController');

router.get('/', highlightCardController.getMonthlySummary);

module.exports = router;