let express = require('express'),
    bodyparser = require('body-parser'),
    mysql = require('mysql'),
    path = require('path'),
    port = process.env.PORT || 5501,
    server = express(),
    lastDate = new Date(),
    tokens = require('crypto').randomBytes(64).toString('hex');
    routes = require('./routes'),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: (req, file, cb)=>{cb(null, path.join(__dirname,"../img/uploads/"))},
        filename:(req,file,cb)=>cb(null, Date.now()+path.extname(file.originalname))
    }),
    upload = multer({storage:storage});
function getDate(){
    let d = new Date();
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
setInterval(() => {

    
}, 86400000);
//Válaszfogadás
server.use(bodyparser.urlencoded({extended:false}));
server.use(bodyparser.json());
server.use(express.static(path.join(__dirname, '../')));
server.use('/', routes);
//API
server.get('/api/get-articles', (req, res)=>{
    let pageN = req.query.page,
        Posts = req.query.posts;
    let sql = mysql.createConnection({
        host:"localhost",
        user:"LoginCheck",
        database:"atlas"
    });
    sql.query(`select articles.*, media.url from articles inner join media on media.id=articles.mediaid order by id asc limit ${Posts} offset ${pageN}`, (err, result)=>{
        if (err) console.log(err);
        res.json(result);
    })
})
server.get('/api/article', (req, res)=>{
    let id = req.query.id;
    let sql = mysql.createConnection({
        host:"localhost",
        user:"LoginCheck",
        database:"atlas"
    })
    sql.query(`select articles.*, media.url from articles inner join media on media.id=articles.mediaid where articles.id=${id}`, (err, result)=>{
        if (err) throw err;
        res.status(200).json(result);
    });
})
server.get('/api/get-token', (req, res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"atlas"
    });
    let token = require('crypto').randomBytes(64).toString('hex');
    sql.query(`insert into tokens (token, creationdate) values ("${token}", "${getDate()}")`, (err, rs)=>{
        if (err) console.log(err);
        res.status(200).send('your token is : ' + token);
    });
})
server.get('/api/delete-article', (req, res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"atlas"
    });
    sql.query(`delete from articles where id = ${req.body.id}`, (err, rs)=>{
        if (err) res.status(404).send("No such article");
        res.status(200).send("Deleted "+rs.length+"articles");
    });
});
server.post('/api/upload-article', upload.single("media"), (req, res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"atlas"
    });
    if (req.file!=undefined){
        sql.query(`insert into media (type, url) values ("picture", "img/uploads/${req.file.filename}")`);
        sql.query(`insert into articles (author, date, title, description, article, mediaid) values ("${req.body.author}", "${getDate()}", "${req.body.title}", "${req.body.description}", "${req.body.article}", (select id from media where url="img/uploads/${req.file.filename}"))`, (err, result)=>{
            if (err) console.log(err);
            res.status(200).send("success")
        });
    }
    else{
        sql.query(`insert into articles (author, date, title, description, article, mediaid) values ("${req.body.author}", "${getDate()}", "${req.body.title}", "${req.body.description}", "${req.body.article}", "none")`, (err, result)=>{
            if (err) console.log(err);
            res.status(200).send("success");
        });
    }
    
});
server.post('/admin/login', (req,res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:"LoginCheck",
        database:"atlas"
    });
    sql.query(`select * from logins where username="${req.body.username}" and password="${req.body.password}"`, (err, results)=>{
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
server.put('/api/update-article', (req, res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"atlas"
    });
    sql.query(`update articles set title="${req.body.title}", description="${req.body.description}", article="${req.body.article}" where id=${req.body.id}`, (err, rs)=>{
        if (err) console.log(err);
        res.status(200).send("Successful edit");
    })
})
//szerver
server.listen(port, ()=>{
    console.log('listening on '+port)
})