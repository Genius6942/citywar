import "./index.css";
import connect from "./lib/socketio";
import "./lib/console";
import { initializeGame } from "./initialize";

(async () => {
  const socket = await connect();
  if (import.meta.env.DEV) {
    socket.on("reload", () => {
      location.reload();
    });

    window.addEventListener("keydown", ({ key }) => {
      if (key === "r") {
        socket.emit("reload");
      }
    });
  }

  initializeGame(socket);
})();
