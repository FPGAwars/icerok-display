//-- Botón de conexion al puerto serie
const btn_open = document.getElementById('btn_open');
const disp_term = document.getElementById('disp_term');

//-- RETROLLAMADA DEL BOTON DE CONEXION
btn_open.addEventListener('click', async () => {

  let filter = { usbVendorId : 0x403};
  let port = await navigator.serial.requestPort({ filters: [filter]});
  await port.open({ baudRate: 12000000 });

  const reader = port.readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    disp_term.innerHTML += "0x" + value[0].toString(16) + " ";
    
  }
});
