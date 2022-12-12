import { RootState } from '../store';
// @ts-ignore
import desertTexture from "../../assets/textures/desert.jpg";
import Contstants from "../../../shared/Constants";
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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Constants from "../../../shared/Constants";
import { initializeMouseRaycast } from "./raycast";
import { open } from "../controls/data";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

const bindDrag = (
	element: HTMLCanvasElement,
	translateCallback: (x: number, y: number) => void,
	rotateCallBack: (x: number, y: number) => void
) => {
	let button = -1;
	element.addEventListener("mousedown", (e) => {
		button = e.button;
	});
	document.addEventListener("mousemove", ({ movementX, movementY, ctrlKey }) => {
		if (button > -1) {
			if (ctrlKey || button === 2) {
				rotateCallBack(movementX, movementY);
			} else {
				translateCallback(movementX, movementY);
			}
		}
	});
	document.addEventListener("mouseup", () => {
		button = -1;
	});
};

export const initWorld = (dispatch: ThunkDispatch<RootState, undefined, AnyAction> & Dispatch<AnyAction>) => {
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
	new TextureLoader()
		.loadAsync(desertTexture)
		.then((texture) => {
			tiles.forEach(({ material }) => {
				material.map = texture;
				material.needsUpdate = true;
			});
		})
		.catch(console.error);

	new GLTFLoader().loadAsync("/assets/models/my first project.glb").then((gltf) => {
		const model = gltf.scene;
		scene.add(model);
	});

	const tiles: Mesh<BoxGeometry, MeshStandardMaterial>[] = [];

	const ambientLight = new AmbientLight(0xffffff, 0.5);
	const directionalLight = new DirectionalLight(0xffffff, 0.6);
	scene.add(ambientLight, directionalLight);

	for (let i = 0; i < Constants.GAME.GRID_SIZE; i++) {
		for (let j = 0; j < Constants.GAME.GRID_SIZE; j++) {
			const geometry = new BoxGeometry(
				Constants.GAME.TILE_SIZE,
				1,
				Constants.GAME.TILE_SIZE
			);

			const material = new MeshStandardMaterial();
			const tile = new Mesh(geometry, material);
			tile.position.set(
				i * Constants.GAME.TILE_SIZE,
				-Contstants.GAME.TILE_SIZE / 2,
				j * Constants.GAME.TILE_SIZE
			);
			tile.name = "tile";
			tile.userData = { x: i, y: j };
			scene.add(tile);
			tiles.push(tile);
		}
	}

	const cameraHolder = new Object3D();
	camera.position.y = 4;
	camera.lookAt(0, 0, 0);
	const cameraRotater = new Object3D();
	cameraRotater.add(camera);
	scene.add(cameraRotater);
	cameraHolder.rotation.y = -Math.PI / 2;
	// cameraHolder.rotation.z = -Math.PI / 2
	cameraHolder.position.set(0, 0, -2);

	initializeMouseRaycast(scene, camera, renderer.domElement, (x, y) => {
		dispatch(open({ x, y }))
	});

	bindDrag(
		renderer.domElement,
		(x, y) => {
			cameraHolder.position.z -= ((x / 100) * camera.position.y) / 4;
			cameraHolder.position.x += ((y / 100) * camera.position.y) / 4;
		},
		(x, y) => {
			cameraRotater.rotation.x = Math.max(
				Math.min(cameraRotater.rotation.x + y / 100, Math.PI / 2),
				0
			);
		}
	);
	renderer.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
	renderer.domElement.addEventListener("wheel", (e) => {
		camera.position.y += e.deltaY / 100;
	});

	// threejs resize
	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});


	let go = true;
	const render = () => {
		renderer.render(scene, camera);
		go && requestAnimationFrame(render);
	};
	requestAnimationFrame(render);


	return { scene, camera, renderer, stop: () => go = false };
};
