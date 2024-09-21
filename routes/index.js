import routerAuth from "./auth.routes.js"
import routerProduto from "./produtos.routes.js"
import routerUsuario from "./usuario.routes.js"
import routerCarrinho from "./carrinho.routes.js"
import routerCurtidos from "./curtidos.routes.js"

export const routes = (app) => {
    app.use('/api/produto', routerProduto)
    app.use('/api/usuario', routerUsuario)
    app.use('/api/auth', routerAuth)
    app.use('/api/carrinho', routerCarrinho)
    app.use('/api/curtidos', routerCurtidos)
}