const socket = io();
socket.on("connect", () => {
});

socket.on("msg-list", (data) => {
  let html = '';
  data.forEach(item => {
    html +=  item.email + " " + item.fyh + ' : ' + item.msg + '<br><br>';
  });
  document.getElementById('msg-list-div').innerHTML = html;
});

socket.on("product-list", (data) => {
  let html = '';
  data.forEach(item => {
    html +=  `Nombre de producto: ${item.titulo}, precio: ${item.precio} <img class="img-producto" src=${item.thumbnail}> <br><br>` 
  });
  document.getElementById('product-list-div').innerHTML = html;
});

const enviarMsg = () => {
  const today = new Date();
  const now = today.toLocaleString();
  const msgParaEnviar = document.getElementById("input-msg").value;
  const emailUser = document.getElementById("emailUser").value;
  socket.emit("msg", {email: emailUser, msg: msgParaEnviar, fyh: now});
};

const enviarProducto = () =>{
  console.log("hola");
  const titulo = document.getElementById("titulo").value;
  const precio = document.getElementById("precio").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const newProduct = {titulo: titulo, precio: precio, thumbnail: thumbnail};
  socket.emit('product', newProduct);
}
