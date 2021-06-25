const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('./mysql').pool
const app = express()
const port = 3000

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

app.get('/cadastro', (req,res) => {
    res.render('views/cadastro.html')
})

app.post('/cadastrar', (req,res)=>{
    //cadastra e depois redireciona pra home
    const {nome, cpf, bairro} = req.body
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error })}
        conn.query('insert into usuarios (nome,cpf,bairro) values (?,?,?)', [nome, cpf, bairro], (error, results) => {
            conn.release()
            if(error) { return res.status(500).send({ error: error }) }
        })
    })
    res.status(201).send({ message: 'Deu certo'})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})