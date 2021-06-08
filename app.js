const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.status(200).send({ message : 'Deu tudo certo!' });
})

app.get('/teste', (req,res) => {
    res.send({ message : 'Deu tudo certo!' });
})

app.listen(8080, () => {
    console.log('Servidor rodando!')
})