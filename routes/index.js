const express = require('express');
const router = express.Router();

const data = require('../data.json');

router.get('/', (req, res) => {
    res.locals.projects = data.projects;
    res.render('index'); 
});

router.get('/about/', (req, res) => {
    res.render('about'); 
});

router.get('/project/:id', (req, res) => {
    res.locals.projects = data.projects;
    const { id } = req.params;
    const name = res.locals.projects[id].project_name;
    const description = res.locals.projects[id].description;
    const technologies = res.locals.projects[id].technologies;
    const liveLink = res.locals.projects[id].live_link;
    const gitRepo = res.locals.projects[id].github_link;
    const images = res.locals.projects[id].image_urls;
    
    const templateData = { id, name, description, technologies, liveLink, gitRepo, images };
    
    
    res.render('project', { templateData }); 
});


module.exports = router;