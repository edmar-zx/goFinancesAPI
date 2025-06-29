const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.get('/', resumeController.getMonthlySummary);

module.exports = router;