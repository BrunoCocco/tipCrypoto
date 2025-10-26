const Datos = [];

class UltimaConstribucion {
  constructor(monto, mensaje) {
    this.monto = monto;
    this.mensaje = mensaje;
    this.fecha = new Date().toLocaleString();
  }
}

function sendTip(event) {
  event.preventDefault(); // evita recargar la página

  const monto = document.getElementById("monto").value;
  const mensaje = document.getElementById("mensaje").value;

  if (!monto || monto <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  const nuevaPropina = new UltimaConstribucion(monto, mensaje);
  Datos.push(nuevaPropina);

  console.log(`Propina enviada: ${monto} ETH`);
  console.log(`Mensaje: ${mensaje}`);
  console.log(Datos);

  StorageUp();
  mostrarMenj();
}

// Guarda los datos en localStorage como texto JSON
const StorageUp = () => {
  localStorage.setItem("datosPropina", JSON.stringify(Datos));
};

// Muestra el último dato guardado
const mostrarMenj = () => {
  let datos = JSON.parse(localStorage.getItem("datosPropina"));

  if (datos && datos.length > 0) {
    let ultima = datos[datos.length - 1];
    console.log("Última propina guardada:");
    console.log("Monto:", ultima.monto);
    console.log("Mensaje:", ultima.mensaje);
    console.log("Fecha:", ultima.fecha);
  } else {
    console.log("No hay datos guardados en 'datosPropina'");
  }
};




  // Más adelante acá conectamos con MetaMask y el contrato:
  // -> conectar wallet
  // -> ejecutar función sendTip del contrato