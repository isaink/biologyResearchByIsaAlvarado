const express = require('express');
const router = express.Router();
const { getAllTaggings, getSingleTagging, getTagResearcher, getTagAnimal, addTag } = require('../db/queries/taggings-Q.js')

// Creating routers
router.get('/', getAllTaggings);
router.get('/:id', getSingleTagging);
router.get('/researchers/:id', getTagResearcher);
router.get('/animals/:id', getTagAnimal);
router.post('/', addTag);

module.exports = router;
