const express = require('express'); // ode.js
const router = express.Router();
const {  getAnimals, getSingleAnimal, addAnimal, updateAnimal, deleteAnimal } = require('../db/queries/animals-Q.js')

router.get('/', getAnimals);
router.get('/:id', getSingleAnimal);
router.post('/', addAnimal);
router.patch('/:id', updateAnimal);
router.delete('/:id',  deleteAnimal);

module.exports = router;
