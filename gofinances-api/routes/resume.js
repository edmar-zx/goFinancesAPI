const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.get('/monthlyTotalsAllYears', resumeController.getMonthlyTotalsAllYears);
router.get('/entriesByCategory', resumeController.getEntriesByCategory);


module.exports = router;