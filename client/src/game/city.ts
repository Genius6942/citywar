import { Mesh } from "three";
import TileObject from "../rendering/object";

export default class City extends TileObject {
  object: Mesh;
  level: number;
  constructor({ x = 0, y = 0, owner = "", level = 1 }) {
    super({ x, y, type: "city" });

    this.object = new Mesh;

    this.level = level;
  }

  load() {
    const url = `/assets/models/city/${this.level}.glb`;
    
  }
}
