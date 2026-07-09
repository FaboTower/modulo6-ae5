const fs = require("fs");

const contenido = fs.readFileSync("data/products.json","utf8");

const productos = JSON.parse(contenido);

productos.push({
    id:4, nombre:"Consultoría Digital", precio: 149990
});

fs.writeFileSync("data/products.json", JSON.stringify(productos));
console.log(productos);