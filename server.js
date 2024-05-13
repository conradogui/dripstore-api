import express from 'express'
import { connection } from './db/db.js'

import { produtoRoute } from './routes/produtos.routes.js'

const app = express()

const HOST = 'localhost'
const PORT = 5000

connection()

app.get('/', (req, res) => {
    res.send({
        message:"Servidor rodando",
        status:200
    })
})

produtoRoute(app)

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})
