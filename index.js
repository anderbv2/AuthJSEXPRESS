import express from "express";
import { PORT } from "./config.js";
import { UserRepository } from "./user-repository.js";
import path from 'path'


const app = express();
app.set('view engine', 'ejs')
app.use(express.json());

app.get("/", (req, res) => {
    res.render('example', { username:'Anders' })
    return
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user =await UserRepository.login({ username, password })
        return res.send({ user})
    } catch (error) {
        return res.status(401).send({ error: error.message })
    }
    })
app.post("/register", async  (req, res) => {
    const { username, password } = req.body
    // pq re.body es undefined? pq por defecto express no tramita el cuerpo
    // del formulario cuando lo enviamos como tipo json
    // tenemos que utilizar un middleware, un middleware es un metodo que se ejecuta
    // antes de que el servidor procese la peticion
    console.log(req.body);


    try {
        const id = await UserRepository.create({ username, password })
        return res.send({ id })
    }
    catch (error) {
        // Normalmente no es buena idea mandar el error del Repository
        return res.status(400).send({ error: error.message })
    }
    return
})
app.post("/logout",  (req, res) => {})
app.post("/protected",  (req, res) => {})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
