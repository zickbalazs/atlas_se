let app = require('express'),
    routes = app.Router(),
    path = require('path');

routes.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, '../index.html'));
});
routes.get('/sports', (req, res)=>{
    res.sendFile(path.join(__dirname, '../html/sport.html'));
});
routes.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, '../html/about.html'));
});
routes.get('/news', (req, res)=>{
    res.sendFile(path.join(__dirname, '../html/news.html'));
});
routes.get('/supporters', (req, res)=>{
    res.sendFile(path.join(__dirname, '../html/supporters.html'));
});
routes.get('/sports/eroemeles', (req, res)=>{
    res.sendFile(path.join(__dirname, '../html/sport/eroemeles.html'));
});
routes.get('/sports/testepites', (req, res)=>{
    res.sendFile(path.join(__dirname, '../html/sport/testepites.html'));
});
routes.get('/sports/erosport', (req, res)=>{
    res.sendFile(path.join(__dirname, '../html/sport/erosport.html'));
});
routes.get('/admin', (req, res)=>{
    res.sendFile(path.join(__dirname, '../admin/login.html'));
})
routes.get('/admin/dashboard', (req, res)=>{
    res.sendFile(path.join(__dirname, '../admin/hub.html'));
})

module.exports=routes;