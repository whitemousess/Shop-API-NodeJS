const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const checkLogin = require('../middleware/login')
const PetController = require('../controllers/PetController');

// get pets
router.get('/show',PetController.GetPage)
router.get('/show/:id',PetController.GetPet)

// Dogs
router.post('/add', upload.single("image"),checkLogin,PetController.PetCreate)
router.put('/:id/edit', upload.single("image"),checkLogin,PetController.PetEdit)
router.delete('/:id/delete',checkLogin,PetController.PetDelete)

module.exports = router;
