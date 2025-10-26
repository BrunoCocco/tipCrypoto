// Inicializamos desde localStorage si hay datos previos
let Datos = JSON.parse(localStorage.getItem("datosPropina")) || [];

// Nombre corregido de la clase (más readable)
class UltimaContribucion {
  constructor(monto, mensaje) {
    this.monto = monto;
    this.mensaje = mensaje;
    this.fecha = new Date().toLocaleString();
  }
}

function sendTip(event) {
  event.preventDefault();

  // leo y parseo monto
  const montoRaw = document.getElementById("monto").value;
  const monto = parseFloat(montoRaw);

  const mensaje = document.getElementById("mensaje").value || "";

  if (isNaN(monto) || monto <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  const nuevaPropina = new UltimaContribucion(monto, mensaje);
  Datos.push(nuevaPropina);

  // guardo y actualizo la UI
  StorageUp();
  mostrarMenj();
}

// Guarda los datos en localStorage
const StorageUp = () => {
  localStorage.setItem("datosPropina", JSON.stringify(Datos));
};

// Muestra los últimos 3 mensajes
const mostrarMenj = () => {
  // leo del storage para asegurar sincronía
  const datos = JSON.parse(localStorage.getItem("datosPropina")) || [];

  const contenedor = document.getElementById("printPropinas");
  // limpio el contenedor antes de renderizar
  contenedor.innerHTML = "";

  if (!datos.length) {
    console.log("No hay datos guardados en 'datosPropina'");
    return;
  }

  // obtengo los últimos 3 elementos (puede ser menos)
  const ultimosTres = datos.slice(-3);

  // iteramos de forma segura
  for (let i = 0; i < ultimosTres.length; i++) {
    const item = ultimosTres[i];

    // Construyo la tarjeta — OJO: si 'mensaje' viene del usuario, mejor escapar.
    // Aquí muestro un ejemplo rápido con innerHTML; para producción usa createElement/textContent.
    contenedor.innerHTML += `
      <div class="propina mt-5">
        <h3></h3>
        <h5>"${escapeHtml(item.mensaje)}"</h5>
        <h5>$ ${Number(item.monto).toFixed(2)}</h5>
        <h5>Gracias por tu aporte, el equipo te ama!</h5>
      </div>
    `;
  }
};

// helper simple para escapar texto y evitar XSS si usás innerHTML
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}


// Más adelante acá conectamos con MetaMask y el contrato:
// -> conectar wallet
// -> ejecutar función sendTip del contrato
