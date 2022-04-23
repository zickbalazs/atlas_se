const { env } = require('process');

let express = require('express'),
    bodyparser = require('body-parser'),
    mysql = require('mysql'),
    path = require('path'),
    port = 5500 || process.env.PORT;
let server = express();

server.use(bodyparser.urlencoded({extended:false}));
server.use(bodyparser.json());
//server.use(express.static(path.join(__dirname, '../')));


//server.get('/',(req, res)=>{
//    res.sendFile(path.join(__dirname, '../index.html'));
//})


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
server.get('/api/login', (req, res)=>{
    let sql = mysql.createConnection({
        host:"localhost",
        user:req.body.user,
        password:req.body.pass,
        database: "atlas"
    });
    sql.connect((err)=>{
        if (err) {
            res.status(401).send(err);
        }
        else {res.send("success")}
    });
});
server.post('/api/create-article', (req, res)=>{
    SendPosts(req.body, res);
    if (res.statusCode=200) res.send("Thx");
    else res.send("Valami szar");
});
server.listen(5501, ()=>{
    console.log('listening on 5501')
})


function SendPosts(articleJSON, res){
    let picid = articleJSON.Pic,
        date = articleJSON.Date,
        author = articleJSON.Author,
        sh_Txt = articleJSON.Short,
        article = articleJSON.Article,
        category = articleJSON.Category,
        password = articleJSON.Pass,
        connection = mysql.createConnection({
        host: "localhost",
        user: "creator",
        database: "atlas",
        password: password
    });
    connection.connect((err)=>{
        if (err) {
            res.send(new Date().toLocaleTimeString() + err);
        }
        else{
            let SQL = `INSERT INTO news (author, date, short, article, c_id, picid) VALUES ("${author}", "${date}", "${sh_Txt}", "${article}", ${category}, ${picid})`;
            connection.query(SQL, (err, result)=>{
                if (err) console.log(new Date().toLocaleTimeString() + err)
                else console.log(new Date().toLocaleTimeString() + result);
            });
        }
    });
    console.log(new Date().toLocaleTimeString() + " insert zárva");
}