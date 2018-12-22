const express = require('express');
const router = express.Router();
const { getAllSightings, getSightOnSpecie, getSightOnResearcher, getSightOnHabitat, addSightings, deleteSightings } =require('../db/queries/sightings-Q.js');

// Creating routers
router.get('/', getAllSightings);
router.get('/species/:id', getSightOnSpecie);
router.get('/researchers/:id', getSightOnResearcher);
router.get('/habitats/:id', getSightOnHabitat);
router.post('/', addSightings);
router.delete('/:id', deleteSightings);

module.exports = router;
