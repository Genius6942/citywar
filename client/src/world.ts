// @ts-ignore
import desertTexture from "../assets/textures/desert.jpg";
import Contstants from "../../shared/Constants";
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer,
} from "three";
import Constants from "../../shared/Constants";

const bindDrag = (
  element: HTMLCanvasElement,
  translateCallback: (x: number, y: number) => void,
  rotateCallBack: (x: number, y: number) => void
) => {
  let isDragging = false;
  element.addEventListener("mousedown", (e) => {
    isDragging = true;
  });
  document.addEventListener("mousemove", ({ movementX, movementY, ctrlKey }) => {
    if (isDragging) {
      if (ctrlKey) {
        rotateCallBack(movementX, movementY);
      } else {
        translateCallback(movementX, movementY);
      }
    }
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
};

export const initWorld = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new BoxGeometry(Constants.GAME.TILE_SIZE, 1, Constants.GAME.TILE_SIZE);

  const material = new MeshStandardMaterial();
  new TextureLoader()
    .loadAsync(desertTexture)
    .then((texture) => {
      material.map = texture;
      material.needsUpdate = true;
    })
    .catch(console.error);

  const ambientLight = new AmbientLight(0xffffff, 0.5);
  const directionalLight = new DirectionalLight(0xffffff, 0.6);
  scene.add(ambientLight, directionalLight);

  for (let i = 0; i < Constants.GAME.GRID_SIZE; i++) {
    for (let j = 0; j < Constants.GAME.GRID_SIZE; j++) {
      const tile = new Mesh(geometry, material);
      tile.position.set(
        i * Constants.GAME.TILE_SIZE,
        -Contstants.GAME.TILE_SIZE / 2,
        j * Constants.GAME.TILE_SIZE
      );
      scene.add(tile);
    }
  }

  const cameraHolder = new Object3D();
  cameraHolder.position.set(0, 0, -2);
  camera.position.y = 4;
  cameraHolder.add(camera);
  camera.lookAt(0, 0, 0);
  scene.add(cameraHolder);

  bindDrag(
    renderer.domElement,
    (x, y) => {
      cameraHolder.position.x += ((x / 100) * camera.position.y) / 4;
      cameraHolder.position.z += ((y / 100) * camera.position.y) / 4;
    },
    (x, y) => {
      cameraHolder.rotation.y += x / 100;
      cameraHolder.rotation.x += y / 100;
    }
  );
  renderer.domElement.addEventListener("contextMenu", (e) => e.preventDefault());
  renderer.domElement.addEventListener("wheel", (e) => {
    camera.position.y += e.deltaY / 100;
  });

  const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  return { scene, camera, renderer };
};
