const express = require('express');
const router = express.Router();
const { getResearchers, getSingleResearcher, addResearcher, updateResearcher, deleteResearcher } = require('../db/queries/researchers-Q.js');

// Creating routers
router.get('/', getResearchers);
router.get('/:id', getSingleResearcher);
router.post('/', addResearcher);
router.patch('/:id', updateResearcher);
router.delete('/:id', deleteResearcher);

module.exports = router
