import { initWorld } from "./world";
import { Socket } from "socket.io-client";
export const initializeGame = async (socket: Socket) => {
  initWorld();
};
