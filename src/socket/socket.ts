import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8900", {
    withCredentials: true,
});

export default socket;
