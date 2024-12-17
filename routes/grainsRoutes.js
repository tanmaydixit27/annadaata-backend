const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createGrain, getGrains, updateGrain, deleteGrain } = require('../controllers/grainsController');


router.post('/', authMiddleware, createGrain);


router.get('/', authMiddleware, getGrains);


router.put('/:id', authMiddleware, updateGrain);


router.delete('/:id', authMiddleware, deleteGrain);

module.exports = router;
