const API_URL = "/api/productos";

const estadoEl = document.getElementById("estado");
const productosEl = document.getElementById("productos");
const form = document.getElementById("productoForm");
const btnCancelar = document.getElementById("btnCancelar");

const productoId = document.getElementById("productoId");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");

function mostrarEstado(mensaje, tipo = "ok") {
  estadoEl.textContent = mensaje;
  estadoEl.className = `estado ${tipo}`;
}

function limpiarEstado() {
  estadoEl.textContent = "";
  estadoEl.className = "estado";
}

function limpiarFormulario() {
  productoId.value = "";
  nombre.value = "";
  descripcion.value = "";
  precio.value = "";
  stock.value = "";
}

function llenarFormulario(producto) {
  productoId.value = producto.id;
  nombre.value = producto.nombre;
  descripcion.value = producto.descripcion || "";
  precio.value = producto.precio;
  stock.value = producto.stock;
}

async function cargarProductos() {
  try {
    limpiarEstado();
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("No se pudieron cargar los productos");
    }

    const productos = await response.json();
    renderizarProductos(productos);
  } catch (error) {
    mostrarEstado(error.message, "error");
  }
}

function renderizarProductos(productos) {
  productosEl.innerHTML = "";

  if (!productos.length) {
    productosEl.innerHTML = "<p>No hay productos registrados.</p>";
    return;
  }

  productos.forEach((producto) => {
    const card = document.createElement("article");
    card.className = "producto";

    card.innerHTML = `
      <span class="badge">ID #${producto.id}</span>
      <h3>${producto.nombre}</h3>
      <p><strong>Descripción:</strong> ${producto.descripcion || "Sin descripción"}</p>
      <p><strong>Precio:</strong> $${producto.precio}</p>
      <p><strong>Stock:</strong> ${producto.stock}</p>
      <div class="acciones">
        <button class="btn-primary" onclick='editarProducto(${JSON.stringify(producto)})'>Editar</button>
        <button class="btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </div>
    `;

    productosEl.appendChild(card);
  });
}

async function guardarProducto(event) {
  event.preventDefault();

  const data = {
    nombre: nombre.value.trim(),
    descripcion: descripcion.value.trim(),
    precio: Number(precio.value),
    stock: Number(stock.value),
  };

  const id = productoId.value;
  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const response = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.message || "Error al guardar producto");
    }

    mostrarEstado(id ? "Producto actualizado correctamente." : "Producto creado correctamente.");
    limpiarFormulario();
    await cargarProductos();
  } catch (error) {
    mostrarEstado(error.message, "error");
  }
}

function editarProducto(producto) {
  llenarFormulario(producto);
  mostrarEstado(`Editando producto ID ${producto.id}`);
}

async function eliminarProducto(id) {
  const confirmar = confirm(`¿Deseas eliminar el producto ID ${id}?`);
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.message || "Error al eliminar producto");
    }

    mostrarEstado("Se ha eliminado por fin este producto inutil");
    await cargarProductos();
  } catch (error) {
    mostrarEstado(error.message, "error");
  }
}

btnCancelar.addEventListener("click", () => {
  limpiarFormulario();
  mostrarEstado("Edición cancelada.");
});

form.addEventListener("submit", guardarProducto);

cargarProductos();
