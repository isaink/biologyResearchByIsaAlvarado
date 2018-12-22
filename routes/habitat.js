const express = require('express');
const router = express.Router();
const { getAllHabitats, getSingleHabitats, addHabitat } = require('../db/queries/habitats-Q.js')

// Creating routers
router.get('/', getAllHabitats);
router.get('/:id', getSingleHabitats);
router.post('/', addHabitat);

module.exports = router;
