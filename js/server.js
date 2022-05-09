let express = require('express'),
    bodyparser = require('body-parser'),
    mysql = require('mysql'),
    path = require('path'),
    port = process.env.PORT || 5501,
    server = express(),
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
//Válaszfogadás
server.use(bodyparser.urlencoded({extended:false}));
server.use(bodyparser.json());
server.use(express.static(path.join(__dirname, '../')));
server.use('/', routes);
//API
server.post('/api/upload-article', upload.single('postimg'), (req, res)=>{
    let q = mysql.createConnection({
        host:"localhost",
        user:"root",
        database:"atlas"
    })
    if (req.file!=undefined){
        let date = getDate();
        q.query(`insert into articles (postdate, category, author, title, short, article, picture) values ("${date}", "${req.body.category}","${req.body.author}", "${req.body.title}", "${req.body.short}", "${req.body.article}", "${req.file.filename}")`, (err)=>{
            if (err) console.log(err)
            else res.status(200).send("Successful upload");
        });
    }
    else {
        let date = getDate();
        q.query(`insert into articles (postdate, category, author, title, short, article, picture) values ("${date}", "${req.body.category}","${req.body.author}", "${req.body.title}", "${req.body.short}", "${req.body.article}", "null")`, (err)=>{
            if (err) console.log(err)
            else res.status(200).send("Successful upload");
        });
    }
});
server.get('/api/get-articles', (req, res)=>{
    let offset = req.query.page,
        limit = req.query.posts;
    let q = mysql.createConnection({
        host:"localhost",
        user:"LoginCheck",
        database:"atlas"
    })
    q.query(`select * from articles order by postdate desc limit ${limit} offset ${offset}`, (err, result)=> {
        if (err) console.log(err);
        res.status(200).json(result);
    });
})
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
//szerver
server.listen(port, ()=>{
    console.log('listening on '+port)
})