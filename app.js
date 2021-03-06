const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const mysql = require('./mysql').pool
const bcrypt = require('bcrypt')
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
    // Deixar a tela inicial aqui, portanto, mude o arquivo de login para login.html, deixa o index.html para a tela inicial
    res.render('views/index.html')
})

app.get('/cadastro', (req,res) => {
    res.render('views/cadastro.html')
})

app.post('/cadastrar', (req,res,next)=>{
    //cadastra e depois redireciona pra home
    const {email, nome, senha} = req.body
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error })}
        conn.query('insert into usuarios (email,nome,senha) values (?,?,?)', [email, nome, senha], (error, results) => {
            conn.release()
            if(error) { return res.status(500).send({ error: error }) }
        })
    })
    res.status(201).render('views/index.html', { isAdded: true}) //o {isAdded: true} vai ser usado de condição quando for usar o sweetAlert2 para confirmação de cadastro
    next()
})

app.get('/login', (req,res) => {
    res.render('views/login.html')
})

app.post('/logar', (req,res,next) => {
    
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})