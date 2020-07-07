const express = require('express');
const app = express();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.post('/signup', (req, res, next) => {
    debugger

    let email = req.body.email;
    let password = req.body.password;

    if(email === '' || password === ''){
        res.status(500).json({errorMessage:'All fields are required to signup.'});
        return;
    }

    User.findOne({email:email})
        .then((user)=>{

            if(user){
                res.status(500).json({errorMessage: 'Email already exists, please choose another one.'})   
            }
            else{
                
                bcrypt.hash(password, saltRounds, function (err, hash) {

                    if(!err){
                        User.create({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            postalCode:req.body.postalCode,
                            password: hash,

                        })
                        .then((user) => {
                            res.json(user);
                        })
                        .catch((err) => {
                            res.status(500).json({errorMessage: 'An error occurred while encrypting password.'})   
                        });
                    }
                    else{
                        res.status(500).json({errorMessage: 'An error occured while creating your account. Please try again later.'});
                    }

                });
            }

        })
        .catch((err)=>{
            next(err);
        })
});

module.exports = app;
