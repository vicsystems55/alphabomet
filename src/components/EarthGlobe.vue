<template>
  <div ref="wrap" class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <canvas ref="canvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

gsap.registerPlugin(ScrollTrigger);

const canvas = ref(null);

let scene;
let camera;
let renderer;
let controls;
let globe;
let globeGroup;
let animationId;
let scrollTimeline;
let cameraMode = 'default'; // 'default', 'orbit', 'flyover', 'closeup'
let cameraTransitioning = false;

const GOLD = "#DCC190";
const BURGUNDY = "#801418";
const NEON_AFRICA = "#FF6B35";

// Predefined camera angles
const CAMERA_PRESETS = {
  default: {
    position: { x: 0, y: 0, z: 280 },
    target: { x: 0, y: 0, z: 0 },
    fov: 45
  },
  orbit: {
    position: { x: 150, y: 50, z: 200 },
    target: { x: 20, y: 0, z: 0 },
    fov: 35
  },
  flyover: {
    position: { x: 0, y: 180, z: 250 },
    target: { x: 20, y: 0, z: 0 },
    fov: 30
  },
  closeup: {
    position: { x: 40, y: 20, z: 120 },
    target: { x: 20, y: 0, z: 0 },
    fov: 50
  },
  dramatic: {
    position: { x: -100, y: -40, z: 180 },
    target: { x: 20, y: 0, z: 0 },
    fov: 40
  }
};

const initScene = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 280);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Initialize OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;
  controls.enableZoom = true;
  controls.zoomSpeed = 0.5;
  controls.enablePan = false; // Disable panning for better experience
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 50;
  controls.maxDistance = 500;
  controls.target.set(20, 0, 0);
  controls.update();

  // Make controls accessible globally for camera features
  window.__controls = controls;
};

const createGlobe = () => {
  globe = new ThreeGlobe()
    .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
    .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
    .showAtmosphere(true)
    .atmosphereColor(GOLD)
    .atmosphereAltitude(0.32)
    .polygonAltitude((d) => (d.properties?.isAfrica ? 0.025 : 0.01))
    .polygonCapColor((d) =>
      d.properties?.isAfrica
        ? "rgba(255, 107, 53, 0.25)"
        : "rgba(220, 193, 144, 0.035)"
    )
    .polygonSideColor((d) =>
      d.properties?.isAfrica
        ? "rgba(255, 107, 53, 0.35)"
        : "rgba(125, 17, 24, 0.06)"
    )
    .polygonStrokeColor((d) =>
      d.properties?.isAfrica
        ? "rgba(255, 107, 53, 1)"
        : "rgba(220, 193, 144, 0.75)"
    );

  globe.scale.set(1.5, 1.5, 1.5);

  globeGroup = new THREE.Group();
  globe.position.set(20, 0, 0);
  globe.rotation.set(0.1, -0.45, 0);
  globeGroup.position.set(-55, 0, 0);
  globeGroup.add(globe);
  scene.add(globeGroup);

  globe.onGlobeReady(() => {
    customizeGlobeMaterials();
  });
};

// Camera transition function
const transitionToCamera = (presetKey, duration = 1.5) => {
  if (cameraTransitioning) return;
  
  const preset = CAMERA_PRESETS[presetKey];
  if (!preset) return;

  cameraTransitioning = true;
  cameraMode = presetKey;

  // Store current camera state
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  
  // Create target positions
  const endPos = new THREE.Vector3(preset.position.x, preset.position.y, preset.position.z);
  const endTarget = new THREE.Vector3(preset.target.x, preset.target.y, preset.target.z);

  // Animate camera position
  gsap.to(camera.position, {
    x: endPos.x,
    y: endPos.y,
    z: endPos.z,
    duration: duration,
    ease: "power2.inOut",
    onUpdate: () => {
      controls.update();
    }
  });

  // Animate controls target
  gsap.to(controls.target, {
    x: endTarget.x,
    y: endTarget.y,
    z: endTarget.z,
    duration: duration,
    ease: "power2.inOut",
    onUpdate: () => {
      controls.update();
    },
    onComplete: () => {
      cameraTransitioning = false;
    }
  });

  // Animate FOV if different
  if (preset.fov !== camera.fov) {
    gsap.to(camera, {
      fov: preset.fov,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.updateProjectionMatrix();
      }
    });
  }
};

// Cycle through camera modes
const cycleCameraMode = () => {
  const modes = ['default', 'orbit', 'flyover', 'closeup', 'dramatic'];
  const currentIndex = modes.indexOf(cameraMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  transitionToCamera(modes[nextIndex]);
};

// Auto-rotate toggle
const toggleAutoRotate = () => {
  controls.autoRotate = !controls.autoRotate;
};

// Custom camera path (smooth orbit around globe)
const createOrbitPath = () => {
  const points = [];
  const radius = 250;
  const heightVariation = 30;
  
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * 2) * heightVariation;
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
};

// Follow a camera path
let pathProgress = 0;
let isFollowingPath = false;
const followCameraPath = () => {
  const pathPoints = createOrbitPath();
  isFollowingPath = true;
  
  gsap.to({ progress: 0 }, {
    progress: 1,
    duration: 20,
    ease: "linear",
    onUpdate: function() {
      const progress = this.targets()[0].progress;
      const index = Math.floor(progress * (pathPoints.length - 1));
      const nextIndex = Math.min(index + 1, pathPoints.length - 1);
      const frac = (progress * (pathPoints.length - 1)) % 1;
      
      const p1 = pathPoints[index];
      const p2 = pathPoints[nextIndex];
      
      if (p1 && p2) {
        const currentPos = new THREE.Vector3().lerpVectors(p1, p2, frac);
        camera.position.copy(currentPos);
        controls.target.set(20, 0, 0);
        controls.update();
      }
    },
    onComplete: () => {
      isFollowingPath = false;
    }
  });
};

const customizeGlobeMaterials = () => {
  if (!globe) return;

  const material = globe.globeMaterial();
  
  if (material) {
    material.transparent = true;
    material.opacity = 0.55;
    material.color = new THREE.Color(BURGUNDY);
    material.emissive = new THREE.Color(BURGUNDY);
    material.emissiveIntensity = 0.04;
    material.needsUpdate = true;
  }

  const atmosphereMaterial = globe.atmosphereMaterial?.();
  if (atmosphereMaterial) {
    atmosphereMaterial.transparent = true;
    atmosphereMaterial.opacity = 0.3;
    atmosphereMaterial.color = new THREE.Color(GOLD);
    atmosphereMaterial.needsUpdate = true;
  }
};

const loadContinentBorders = async () => {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson"
    );

    const geoData = await res.json();

    const continentGroups = {};

    geoData.features.forEach((country) => {
      const continent = country.properties.CONTINENT;

      if (!continentGroups[continent]) {
        continentGroups[continent] = [];
      }

      continentGroups[continent].push(country);
    });

    const continentPolygons = Object.entries(continentGroups).flatMap(
      ([continent, countries]) =>
        countries.map((country) => ({
          ...country,
          properties: {
            ...country.properties,
            continent,
            isAfrica: continent === "Africa",
          },
        }))
    );

    globe.polygonsData(continentPolygons);
  } catch (error) {
    console.error("Could not load continent borders:", error);
  }
};

const addLights = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
  scene.add(ambientLight);

  const goldLight = new THREE.PointLight(GOLD, 4, 700);
  goldLight.position.set(80, 80, 140);
  scene.add(goldLight);

  const burgundyLight = new THREE.PointLight(BURGUNDY, 4, 600);
  burgundyLight.position.set(-120, -60, 120);
  scene.add(burgundyLight);

  const outlineGlow = new THREE.PointLight(GOLD, 9, 1000);
  outlineGlow.position.set(0, 0, 240);
  scene.add(outlineGlow);

  // Enhanced neon lights around Africa
  const africaNeonColors = [
    "#FF6B35",
    "#FF4500",
    "#FF8C00",
    "#FFD700",
    "#FF1493",
  ];

  const africaPosition = { x: 20, y: 0, z: 0 };
  
  africaNeonColors.forEach((color, index) => {
    const angle = (index / africaNeonColors.length) * Math.PI * 2;
    const radius = 80 + Math.random() * 30;
    const heightOffset = Math.sin(angle * 2) * 30;
    
    const neonLight = new THREE.PointLight(color, 6, 500);
    neonLight.position.set(
      africaPosition.x + Math.cos(angle) * radius,
      africaPosition.y + Math.sin(angle * 1.5) * 40 + heightOffset,
      africaPosition.z + Math.sin(angle) * radius
    );
    scene.add(neonLight);

    const sphereGeometry = new THREE.SphereGeometry(2, 8, 8);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(neonLight.position);
    scene.add(sphere);
  });

  const spotlight1 = new THREE.SpotLight(NEON_AFRICA, 8, 600, Math.PI / 6, 0.3, 0.5);
  spotlight1.position.set(60, 60, 100);
  spotlight1.target.position.set(20, 0, 0);
  scene.add(spotlight1);
  scene.add(spotlight1.target);

  const spotlight2 = new THREE.SpotLight("#FF4500", 6, 500, Math.PI / 6, 0.3, 0.5);
  spotlight2.position.set(-20, -40, 120);
  spotlight2.target.position.set(20, 0, 0);
  scene.add(spotlight2);
  scene.add(spotlight2.target);

  const glowGeometry = new THREE.SphereGeometry(25, 16, 16);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: NEON_AFRICA,
    transparent: true,
    opacity: 0.08,
    wireframe: true,
  });
  const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
  glowSphere.position.set(20, 0, 0);
  scene.add(glowSphere);

  window.__africaGlow = glowSphere;
  window.__africaLights = [spotlight1, spotlight2];
};

const createScrollAnimation = () => {
  scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".home-scroll",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
    },
  });

  scrollTimeline
    .to(
      globeGroup.position,
      {
        x: 140,
        y: -80,
        z: 50,
        ease: "power2.out",
      },
      0
    )
    .to(
      globe.scale,
      {
        x: 1.0,
        y: 1.0,
        z: 1.0,
        ease: "power2.out",
      },
      0
    )
    .to(
      globe.rotation,
      {
        y: Math.PI * 1.8,
        x: 0.3,
        ease: "power2.out",
      },
      0
    )
    .to(
      globeGroup.rotation,
      {
        y: Math.PI * 0.35,
        ease: "power2.out",
      },
      0
    )
    // Modified camera animation during scroll - less extreme zoom
    .to(
      camera.position,
      {
        z: 300, // Less extreme than before
        y: -5,
        ease: "power2.out",
      },
      0
    );
};

const animate = () => {
  if (globe) {
    globe.rotation.y += 0.0022;
    if (globeGroup) globeGroup.rotation.y += 0.0005;
  }

  // Update controls if using OrbitControls
  if (controls) {
    controls.update();
  }

  // Animate Africa neon lights
  const time = Date.now() * 0.001;
  
  if (window.__africaGlow) {
    window.__africaGlow.material.opacity = 0.05 + Math.sin(time * 0.5) * 0.03;
    window.__africaGlow.scale.setScalar(1 + Math.sin(time * 0.3) * 0.05);
  }

  if (window.__africaLights) {
    window.__africaLights.forEach((light, index) => {
      const intensity = 5 + Math.sin(time * 0.7 + index * 2) * 2;
      light.intensity = intensity;
    });
  }

  renderer.render(scene, camera);
  animationId = requestAnimationFrame(animate);
};

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

// Expose camera features to window for console testing
const setupCameraControls = () => {
  window.__cameraControls = {
    transitionTo: transitionToCamera,
    cycleMode: cycleCameraMode,
    toggleAutoRotate: toggleAutoRotate,
    followPath: followCameraPath,
    presets: CAMERA_PRESETS,
    getCurrentMode: () => cameraMode,
    reset: () => transitionToCamera('default'),
  };
};

onMounted(() => {
  initScene();
  createGlobe();
  addLights();
  loadContinentBorders();
  createScrollAnimation();
  setupCameraControls();
  animate();

  window.addEventListener("resize", onResize);

  // Keyboard shortcuts for camera control (optional)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'c' || e.key === 'C') {
      cycleCameraMode();
    }
    if (e.key === 'r' || e.key === 'R') {
      toggleAutoRotate();
    }
    if (e.key === 'f' || e.key === 'F') {
      followCameraPath();
    }
    if (e.key === 'Escape') {
      transitionToCamera('default');
    }
  });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onResize);
  scrollTimeline?.kill();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  renderer?.dispose();
  controls?.dispose();
  
  delete window.__africaGlow;
  delete window.__africaLights;
  delete window.__controls;
  delete window.__cameraControls;
});
</script>