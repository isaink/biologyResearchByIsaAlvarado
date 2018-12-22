const express = require('express');
const router = express.Router();
const { getSpecies, getSingleSpecies, addSpecies } = require('../db/queries/species-Q.js')

// Creating routers
router.get('/', getSpecies);
router.get('/:id', getSingleSpecies);
router.post('/', addSpecies);

module.exports = router;
