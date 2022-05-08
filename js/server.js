let express = require('express'),
    bodyparser = require('body-parser'),
    mysql = require('mysql'),
    path = require('path'),
    port = process.env.PORT || 5501,
    server = express(),
    routes = require('./routes');


//Válaszfogadás
server.use(bodyparser.urlencoded({extended:false}));
server.use(bodyparser.json());
server.use(express.static(path.join(__dirname, '../')));
server.use('/', routes);
//API
server.get('/api/news', (req, res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:"Reader",
        database:"atlas"
    });
    sql.connect((err)=>{
        if (err) {
            console.log(new Date().toLocaleTimeString() + err);
        }
        else{
            let command = "SELECT * FROM news order by date desc";
            sql.query(command, (err, result)=>{
                if (err){
                    console.log(new Date().toLocaleTimeString() + err);
                }
                res.json(result);
            })
        }
    })
});
server.post('/admin/login', (req,res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:"LoginCheck",
        database:"atlas"
    });
    console.log(req.body)
    sql.query(`select * from login where username="${req.body.username}" and password="${req.body.password}"`, (err, results)=>{
        if (err) console.log(err);
        else{
            if (results.length>0) {
                console.log(req.body.username+" has logged in");
                res.status(200).send('Successful login');
            }
            else {
                res.status(401).send('Unauthorized login!');
            }
        }
    });


});
server.listen(port, ()=>{
    console.log('listening on '+port)
})