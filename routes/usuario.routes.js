import express from 'express'
import { userService } from '../services/usuario.service.js'

export const userRoute = (app) => {
    var route = express.Router()

    route.get("/", userService.getAll)
    route.get("/:id", userService.getById)
    route.post("/", userService.create)
    route.put("/:id", userService.update)
    route.delete("/:id", userService.delete)

    app.use('/api/usuario', route)
    
}