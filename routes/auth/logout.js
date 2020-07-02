const express = require('express');
const app = express();

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(!err){
        res.status(200).json({message:"success"});
    }
    else{
        res.status(500).json({message:err});
    }
    
  });
});

module.exports = app;