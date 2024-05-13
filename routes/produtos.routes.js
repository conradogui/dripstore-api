import express from 'express'
import { produtoService } from '../services/produtos.service.js'

export const produtoRoute = (app) => {
    var route = express.Router()

    route.get("/", produtoService.getAll)

    app.use('/api/produto', route)
}