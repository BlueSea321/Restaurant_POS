const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('../models/all-models.js');
const servers = models.Servers;

//print check and close out order
router.get('/', (req, res, next) => {
    console.log("servers")
    servers.find({})
        .then(result => res.json(result))
        .catch(error => res.json(error));
});

router.post('/add', (req, res, next) => {
    if (req.body) {
    servers.create({'name': req.body.name, 'code': req.body.code}).then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    })
    }
});

router.get('/login/:code', (req,res,next) => {
    servers.findOne({}).where("code").equals(req.params.code)
        .then(result => {
                res.json(result.name)
        })
        .catch(error =>{
            res.json(error);
        })
})

module.exports = router;