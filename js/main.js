const Datos = [];

class UltimaConstribucion {
  constructor(monto, mensaje) {
    (this.monto = monto),
      (this.mensaje = mensaje),
      (this.fecha = new Date().toLocaleString());
  }
}

function sendTip(event) {
  event.preventDefault(); // evita que el form recargue la página

  const monto = document.getElementById("monto").value;
  const mensaje = document.getElementById("mensaje").value;

  const nuevaPropina = new UltimaConstribucion(monto, mensaje);
  Datos.push(nuevaPropina);


    if (!monto || monto <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  console.log(`Propina enviada: ${monto} ETH`);
  console.log(`Mensaje: ${mensaje}`);
  console.log(Datos)


   StorageUp()
  // Más adelante acá conectamos con MetaMask y el contrato:
  // -> conectar wallet
  // -> ejecutar función sendTip del contrato
}

const StorageUp = () => {
    localStorage.setItem("datosPropina" , Datos)
}