//-- Botón de conexion al puerto serie
const btn_open = document.getElementById('btn_open');
const disp_term = document.getElementById('disp_term');
const canvas = document.getElementById('canvas');

const HEIGHT = 50;

let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = HEIGHT;

let data = [HEIGHT];

const PESO = 0x02;

//-- RETROLLAMADA DEL BOTON DE CONEXION
btn_open.addEventListener('click', async () => {

  let filter = { usbVendorId : 0x403};
  let port = await navigator.serial.requestPort({ filters: [filter]});
  await port.open({ baudRate: 12000000 });

  const reader = port.readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    disp_term.innerHTML += "0x" + value[0].toString(16) + " ";

    let bit = (value[0] & PESO)/PESO;

    data.push(HEIGHT - (bit * HEIGHT));
    
    ctx.beginPath();
    
    for (let i = 0; i < data.length-1; i++) {

      ctx.moveTo(i*30, data[i]);
      ctx.lineTo(i*30, data[i+1]);
      ctx.lineTo((i+1)*30, data[i+1]);
    }
    ctx.strokeStyle = 'blue';

    //-- Dibujar el trazo
    ctx.stroke()
    
    ctx.closePath()


  }
});
