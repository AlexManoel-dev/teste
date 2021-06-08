const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/app'))

app.set('views', './views')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.status(200).send({ message : 'Deu tudo certo!' });
})

app.get('/teste', (req,res) => {
    res.render('index.html')
})

app.listen(8080, () => {
    console.log('Servidor rodando!')
})