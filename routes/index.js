const express = require('express');
const router = express.Router();

const data = require('../data.json');

router.get('/', (req, res) => {
    res.locals.projects = data.projects;
    res.render('index'); 
});

router.get('/about', (req, res) => {
    res.render('about'); 
});

router.get('/project/:id', (req, res) => {
    const { id } = data.projects;
    
    res.render('project'); 
});


module.exports = router;