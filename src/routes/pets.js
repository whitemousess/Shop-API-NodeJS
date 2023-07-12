const express = require('express');
const router = express.Router();

const checkLogin = require('../middleware/login')
const PetController = require('../controllers/PetController');

// get all pets
router.get('/show', PetController.GetAllPet)

// Dogs
router.get('/dogs',PetController.DogPets)
router.post('/dogs/add',checkLogin,PetController.DogCreate)
router.put('/dogs/:id/edit',checkLogin,PetController.DogEdit)
router.delete('/dogs/:id/delete',checkLogin,PetController.DogDelete)

// Cats
router.get('/cats',PetController.CatPets)
router.post('/cats/add',checkLogin,PetController.CatCreate)
router.put('/cats/:id/edit',checkLogin,PetController.CatEdit)
router.delete('/cats/:id/delete',checkLogin,PetController.CatDelete)

module.exports = router;
