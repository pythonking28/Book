import { Server } from "socket.io";

export default async function handler(req, res) {
  if (res.socket.server.io) return res.end();
  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  io.on("connection", (socket) => {
    socket.on("join-room", (room_id) => {
      socket.join(room_id);
    });
    socket.on("setStatus", ({ order_id, status }) => {
      io.to(order_id).emit("setStatus", status);
    });
  });
  res.send("Ok");
}
