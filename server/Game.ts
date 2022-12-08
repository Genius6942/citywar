import { Socket } from "socket.io";
import Constants from "../shared/Constants.js";
import io from "./lib/Server.js";
io;
Constants;

const chars: string[] = (
  "abcdefghijklmnopqrstuvwxyz" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "1234567890-"
).split("");

class Game {
  onStart: () => void;
  id: string;
  started: boolean = false;
  startTime: number = 0;
  players: any[] = [];

  constructor(onStart: () => void, id: string) {
    this.onStart = onStart;

    this.id = id;
  }

  addPlayer(socket: Socket, name: string) {
    // join socket to room
    socket.join(this.id);
    console.log("new player", name);
  }

  generateId(length: number): string {
    const id = new Array(length) // empty array
      .fill(null) // array of nulls
      .map((_) => Math.floor(Math.random() * chars.length)) // array of numbers each number is index of char in chars
      .map((idx) => chars[idx]) // array of chars
      .join(""); // string of random chars
    return this.players.map((player) => player.id).includes(id)
      ? this.generateId(length)
      : id;
  }

  tick() {
    console.log("tick");
  }
}

export default Game;
