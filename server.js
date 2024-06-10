import express from 'express'
import { connection } from './db/db.js'
import winston from 'winston'
import cors from 'cors'

import { produtoRoute } from './routes/produtos.routes.js'
import { userRoute } from './routes/usuario.routes.js'

const app = express()

const confCors = {
  origin: 'http://localhost:5173'
}

app.use(cors(confCors))

const HOST = 'localhost'
const PORT = 5000

connection()

//converte o valor recebido via body na requisição
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send({
        message:"Servidor rodando",
        status:200
    })
})

produtoRoute(app)
userRoute(app)


app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})


