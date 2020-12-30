import * as THREE from 'three';
import {renderer, camera, app} from 'app';
import {BufferGeometryUtils} from 'BufferGeometryUtils';
import {GLTFLoader} from 'GLTFLoader';

(async () => {
  let portalGlowSrc = await new Promise((accept, reject) => {
    new GLTFLoader().load(app.files['./portal-glow.glb'], accept, function onprogress() {}, reject);
  });
  // window.portalGlowSrc = portalGlowSrc;
  const portalGlow = portalGlowSrc.scene;
  portalGlow.position.y += 0.1;
  // portalGlow.scale.multiplyScalar(25);
  portalGlow.scale.multiplyScalar(0.25);
  
  // Create an AnimationMixer, and get the list of AnimationClip instances
  const mixer = new THREE.AnimationMixer(portalGlow);
  const clips = mesh.animations;
  // Update the mixer on each frame
  let lastTime = Date.now();
  function update(timestamp) {
    const timeDiff = timestamp - lastTime;
    const deltaSeconds = timeDiff/1000;
    // console.log('got args', Array.from(arguments));
    // debugger;
    mixer.update( deltaSeconds );
    
    lastTime = timestamp;
  }
  // Play a specific animation
  const clip = portalGlowSrc.animations[0];
  const action = mixer.clipAction( clip );
  action.play();
  renderer.setAnimationLoop(update);
  
  app.object.add(portalGlow);
})();