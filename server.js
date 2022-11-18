//https://socket.io/docs/v4/server-initialization/
const express = require("express");
const Contenedor = require('./contenedor');
const contenedor = new Contenedor('./products.txt')

const app = express();

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(8080, () => console.log("SERVER ON http://localhost:" + 8080));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile( __dirname + "/index.html" );
});

let msgs = [];

io.on("connection", (socket) => {
  //atajo los mensajes
  socket.on("msg", (data)=>{
    msgs = [...msgs, data];
    io.sockets.emit("msg-list", msgs);
  })

  socket.on("product", (data)=>{
    contenedor.save(data);
    const listProducts = contenedor.getAll();
    io.sockets.emit("product-list", listProducts);
  })

})




