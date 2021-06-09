const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// app.use(express.static(__dirname + '/app'))
// app.set('views', './views')
// app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public" )));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get('/', (req,res) => {
    res.status(200).send({ message : 'Deu tudo certo'})
})

app.get('/login', (req,res) => {
    res.render('views/index.html')
})

app.listen(8080, () => {
    console.log('Servidor rodando!')
})