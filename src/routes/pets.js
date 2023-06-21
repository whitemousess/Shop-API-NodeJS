const express = require('express');
const router = express.Router();

const DogController = require('../controllers/DogController');
const CatController = require('../controllers/CatController');

// Dogs
router.get('/dogs',DogController.DogPets)
router.post('/dogs/add',DogController.create)
router.put('/dogs/:id/edit',DogController.edit)
router.delete('/dogs/:id/delete',DogController.delete)

// Cats
router.get('/cats',CatController.CatPets)
router.post('/cats/add',CatController.create)
router.put('/cats/:id/edit',CatController.edit)
router.delete('/cats/:id/delete',CatController.delete)

module.exports = router;
