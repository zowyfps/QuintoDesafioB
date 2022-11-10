const express = require('express');
const Contenedor = require('./managers/Contenedor');

let container = new Contenedor('productos.txt');

const app = express();

const PORT = 8080;

app.listen(PORT, () => {console.log(`Server Port ${PORT}`);})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))

app.set("views", __dirname+"/views");
app.set("view engine", "ejs");




app.get('/', async(req,res) => {
    const products = await container.getAll();
    res.render("home", {
        products
    })
})

// app.get('/productos', (req,res) => {
//     res.render("products", {
//         products: test
//     })
// })


app.post('/products', async(req,res) => {
    const product = req.body;
    await container.save(product);
    res.redirect("/");
})