const express = require('express');
const router = express.Router();

const checkLogin = require('../middleware/login')
const PetController = require('../controllers/PetController');

// get all pets
router.get('/show',PetController.GetAllPet)

// Dogs
router.post('/add',checkLogin,PetController.PetCreate)
router.put('/:id/edit',checkLogin,PetController.PetEdit)
router.delete('/:id/delete',checkLogin,PetController.PetDelete)

module.exports = router;
