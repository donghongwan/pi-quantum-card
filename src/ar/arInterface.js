// ar/arInterface.js

import { Entity, Scene } from 'aframe';

class ARInterface {
  constructor() {
    this.scene = new Scene({
      renderer: {
        canvas: document.getElementById('ar-canvas'),
        antialias: true,
      },
    });

    this.createCamera();
    this.createLight();
    this.createAssets();
  }

  createCamera() {
    const camera = new Entity({
      tag: 'camera',
      attributes: {
        position: '0 0 5',
        rotation: '0 0 0',
      },
    });
    this.scene.add(camera);
  }

  createLight() {
    const light = new Entity({
      tag: 'light',
      attributes: {
        type: 'point',
        color: '#ffffff',
        intensity: 1,
      },
    });
    this.scene.add(light);
  }

  createAssets() {
    const assetLoader = new AssetLoader();
    assetLoader.loadAssets(this.scene, [
      { src: 'arAssets/models/robot.glb', type: 'model' },
      { src: 'arAssets/images/background.jpg', type: 'image' },
    ]);
  }
}

class AssetLoader {
  loadAssets(scene, assets) {
    assets.forEach((asset) => {
      switch (asset.type) {
        case 'model':
          this.loadModel(scene, asset.src);
          break;
        case 'image':
          this.loadImage(scene, asset.src);
          break;
        default:
          console.error(`Unsupported asset type: ${asset.type}`);
      }
    });
  }

  loadModel(scene, src) {
    const model = new Entity({
      tag: 'model',
      attributes: {
        src,
      },
    });
    scene.add(model);
  }

  loadImage(scene, src) {
    const image = new Entity({
      tag: 'image',
      attributes: {
        src,
      },
    });
    scene.add(image);
  }
}

const arInterface = new ARInterface();
