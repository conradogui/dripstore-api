import express from 'express'
import { connection } from './db/db.js'
import winston from 'winston'
import cors from 'cors'
import { routes } from './routes/index.js'

const app = express()

const confCors = {
  origin: '*'
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

routes(app)

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})


