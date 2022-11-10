const express = require('express');
const Contenedor = require('./managers/Contenedor');

let container = new Contenedor('productos.txt');

const app = express();

const PORT = 8080;

app.listen(PORT, () => {console.log(`Server Port ${PORT}`);})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"))


app.set("views", __dirname + "/views");

app.set("view engine", "pug");


app.get('/', (req,res) => {
  res.render("home")
})

app.get('/products', async(req,res) => {
  const products = await container.getAll();
  res.render("products", {
      products: products
  })
})


app.post('/products', async(req,res) => {
  const product = req.body;
  await container.save(product);
  res.redirect("/products");
})