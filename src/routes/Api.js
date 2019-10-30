const express = require('express');
const { healthCheck } = require('../controllers/healthCheck');
const { retrieveData, putData } = require('../controllers/sensorData')

const router = express.Router();

router.get('/healthCheck', healthCheck)
router.post('/putData',putData)
router.get('/retrieveData',retrieveData)

module.exports = router;