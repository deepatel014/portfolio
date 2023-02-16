let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// connect to our business contact model.

let Business = require("../models/business");


// get ROute for the Contact list page - READ Operation

router.get('/',(req,res, next) =>{
    Business.find((err,ContactList)=>{
        if(err){
            // return console.error(err);
        } else{
            res.render('business_contact', {title: 'Business Contact List', ContactList:ContactList})
        }
    });
    // res.render('business_contact', { title: 'Deep Patel/Portfolio' });
});

module.exports = router;