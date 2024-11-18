// ar/arInterface.js

import 'aframe';
import 'aframe-ar'; // Ensure you have A-Frame AR component
import { Entity, Scene } from 'aframe';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

class ARInterface {
  constructor() {
    this.scene = new Scene({
      renderer: {
        antialias: true,
        alpha: true,
      },
    });

    this.init();
  }

  async init() {
    this.setupAR();
    this.createCamera();
    this.createLight();
    await this.createAssets();
    this.setupGestureRecognition();
    this.setupObjectInteraction();
  }

  setupAR() {
    const arButton = ARButton.createButton(this.scene.renderer);
    document.body.appendChild(arButton);
  }

  createCamera() {
    const camera = new Entity({
      tag: 'camera',
      attributes: {
        position: '0 0 5',
        rotation: '0 0 0',
        'look-controls': '',
        'wasd-controls': '',
      },
    });
    this.scene.add(camera);
  }

  createLight() {
    const light = new Entity({
      tag: 'light',
      attributes: {
        type: 'directional',
        intensity: 1,
        position: '0 10 0',
      },
    });
    this.scene.add(light);
  }

  async createAssets() {
    const assetLoader = new AssetLoader();
    await assetLoader.loadAssets(this.scene, [
      { src: 'arAssets/models/robot.glb', type: 'model' },
      { src: 'arAssets/images/background.jpg', type: 'image' },
    ]);
  }

  setupGestureRecognition() {
    // Implement gesture recognition using hand tracking or touch events
    const gestureHandler = new GestureHandler(this.scene);
    gestureHandler.init();
  }

  setupObjectInteraction() {
    // Implement object interaction logic
    this.scene.addEventListener('click', (event) => {
      const intersectedObject = event.detail.intersectedObject;
      if (intersectedObject) {
        this.handleObjectClick(intersectedObject);
      }
    });
  }

  handleObjectClick(object) {
    // Logic for handling object clicks (e.g., scaling, rotating, etc.)
    object.scale.set(1.5, 1.5, 1.5); // Example: Scale the object on click
    console.log(`Clicked on: ${object.name}`);
  }
}

class AssetLoader {
  async loadAssets(scene, assets) {
    for (const asset of assets) {
      switch (asset.type) {
        case 'model':
          await this.loadModel(scene, asset.src);
          break;
        case 'image':
          await this.loadImage(scene, asset.src);
          break;
        default:
          console.error(`Unsupported asset type: ${asset.type}`);
      }
    }
  }

  async loadModel(scene, src) {
    const loader = new THREE.GLTFLoader();
    loader.load(src, (gltf) => {
      const model = gltf.scene;
      model.name = src.split('/').pop(); // Set the model name
      scene.add(model);
    });
  }

  async loadImage(scene, src) {
    const image = new Entity({
      tag: 'image',
      attributes: {
        src,
        position: '0 0 -5',
        width: 4,
        height: 3,
      },
    });
    scene.add(image);
  }
}

class GestureHandler {
  constructor(scene) {
    this.scene = scene;
  }

  init() {
    // Implement gesture recognition logic here
    // For example, using hand tracking or touch events
    console.log('Gesture recognition initialized');
  }
}

const arInterface = new ARInterface();
