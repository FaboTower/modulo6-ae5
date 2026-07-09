const form = document.querySelector("#formProducto");
const lista = document.querySelector("#listaProductos");

async function cargarProductos() {
    const respuesta = await fetch("/api/productos");
    const productos = await respuesta.json();

    lista.innerHTML = "";

    productos.forEach((producto) => {
        lista.innerHTML += `<article>
                                <h3>${producto.nombre}</h3>
                                <p>Precio: ${producto.precio.toLocaleString("es-CL")}</p>
                                ${producto.imagen ? `<img src="${producto.imagen}" width=200 >` : `<span>Sin imagen</span>`}
                            </article>`
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    
    console.log(formData);
    await fetch("/api/productos", {
        method:"POST",
        body:formData
    });

    form.reset();
    cargarProductos();
});

cargarProductos();