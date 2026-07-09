const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;

const productosPath = path.join(__dirname, "data", "products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/*");
    },
    filename: (req, file, cb) => {
        const nombreUnique = Date.now() + "-" + file.originalname;
        cb(null, nombreUnique);
    }
})

const upload = multer({storage});

function leerProductos() {
    if(!fs.existsSync(productosPath, "utf8")){
        return [];
    }
    const data = fs.readFileSync(productosPath,"utf8");
    return JSON.parse(data);
}

function guardarProductos(productos){
    fs.writeFileSync(productosPath, JSON.stringify(productos));

}

app.get("/api/productos", (req, res) => {
    const productos = leerProductos();
    res.json(productos);
});

app.post("/api/productos", upload.single("imagen"), (req, res) => {
    const productos = leerProductos();
    console.log(req.file);
    

    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: Number(req.body.precio),
        imagen: req.file ? `/uploads/${req.file.filename}` : null
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);

    res.status(201).json({
        mensaje: "Producto creado",
        producto: nuevoProducto
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); 
});