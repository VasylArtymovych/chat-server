const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
require("colors");
const { usersRoute, messagesRoute } = require("./routes");
const { errorHandler, unknownRoute } = require("./middlewares");
const socket = require("socket.io");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", usersRoute);
app.use("/api/messages", messagesRoute);
app.use(unknownRoute);
app.use(errorHandler);

// connect MongoDb
async function connectDB() {
  try {
    const db = await connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(
      `MongoDb are connected on host ${db.connection.host}, on port ${db.connection.port}, dbName: ${db.connection.name}`
        .bold.green
    );
  } catch (error) {
    console.log(error.message.bold.red);
    process.exit(1);
  }
}
connectDB();

// connect Server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`.bold.blue);
});

// connect Socket.io
const io = socket(server, {
  cors: {
    origin: "https://vasylartymovych.github.io",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
