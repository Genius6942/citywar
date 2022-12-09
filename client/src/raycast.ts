import {
  Scene,
  Camera,
  Raycaster,
  Vector2,
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  Color,
} from "three";

export const initializeMouseRaycast = (
  scene: Scene,
  camera: Camera,
  domElement: HTMLCanvasElement
) => {
  // create a raycast from the current mouse position on the screen that adds a translucent red rectangle over the block the mouse is hovering over

  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const hoverTile = new Mesh(
    new BoxGeometry(1, 0.01, 1),
    new MeshStandardMaterial({
      color: new Color("red"),
      opacity: .3,
			transparent: true,
    })
  );

  scene.add(hoverTile);

  // very far away out of camera
  hoverTile.position.set(2 ** 15, 1, 2 ** 15);

  domElement.addEventListener("mousemove", (event) => {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let intersect of intersects) {
      if (intersect.object.name === "tile") {
        const object = intersect.object as Mesh<BoxGeometry, MeshStandardMaterial>;
        hoverTile.position.copy(object.position);
        hoverTile.position.y = 0;
        break;
      }
    }
  });
};
