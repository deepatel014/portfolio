let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// connect to our business contact model.

let Business = require("../models/business");


// get ROute for the Contact list page - READ Operation

router.get('/',(req,res, next) =>{
    Business.find((err,contactList)=>{
        if(err){
            return console.error(err);
        } else{
            res.render('contacts/list', {title: 'Business Contact List', ContactList: contactList});
            
        }
    });

});

// get ROute for the Add Contact list page - Create  Operation
router.get('/add', (req, res, next)=>{
    res.render('contacts/add', {title: 'Add Contact',});
})


// POST ROute for the processing oof addition to Contact list page - READ Operation
router.post('/add', (req, res, next)=>{
    let newContact = Business({
        "name" : req.body.name,
        "phone" : req.body.phone,
        "email" : req.body.email
    });

    Business.create(newContact , (err,Contact)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            // refresh the COntact List
            res.redirect('/business');
        }
    });
});
// GET route for displaying the EDIT Page - Updatew Operation
router.get('/edit', (req, res, next)=>{
    let id = req.params.id;

    Business.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contacts/edit', {title: 'Edit CONTACT', contact: contactToEdit}) 
            // displayName: req.user ? req.user.displayName : ''})
        }
    });
})

// POST Route for processing the Edit PAage - Update Operation
router.post('/edit', (req, res, next)=>{
    let id = req.params.id

    let updatedContact = BusinessContact({
        "_id": id,
        "name": req.body.name,
        "email": req.body.email,
        "number": req.body.number
    });

    BusinessContact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business contact list
            res.redirect('/busines');
        }
    });
})

//  GET to perform Deletion
router.get('/delete', (req, res, next)=>{
    let id = req.params.id;
    
    Business.remove({_id: id}, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect.apply('/business');
        }
    });
});

module.exports = router;