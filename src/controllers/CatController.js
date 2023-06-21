const PetModel = require('../models/PetModel');

class CatController{
    CatPets(req,res,next){
        PetModel.find({type: 'cat'})
        .sort({_id:-1})
        .then(pets => res.json({data: pets}))
        .catch(next) 
    }
    
    create(req, res, next){
        req.body.type = 'cat';
        const pets = new PetModel(req.body);
        pets.save()
        .then(pet => res.json(pet))
        .catch(next)
    }

    edit(req, res, next){
        PetModel.updateOne({_id: req.params.id} , req.body)
        .then(pets => res.json({data: pets}))
        .catch(next)
    }

    delete(req,res, next){
        PetModel.deleteOne({_id: req.params.id})
               .then(pets => res.json({data: pets}))
               .catch(next)
    }
    
}

module.exports = new CatController;
