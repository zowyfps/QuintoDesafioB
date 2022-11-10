const express = require('express');
const handlebars = require('express-handlebars');
const path =  require('path');
const Contenedor = require('./managers/Contenedor');

let container = new Contenedor('productos.txt');

const viewsFolder = path.join(__dirname,"views");

const app = express();

const PORT = 8080;

app.listen(PORT, () => {console.log(`Server Port ${PORT}`);})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))

app.engine("handlebars", handlebars.engine());

app.set("views", viewsFolder);

app.set("view engine", "handlebars");


app.get('/', (req,res) => {
    res.render("home")
})

app.get('/products', async(req,res) => {
    const products = await container.getAll();
    res.render("products", {
        products
    })
})


app.post('/products', async(req,res) => {
    const product = req.body;
    await container.save(product);
    res.redirect("/products");
})