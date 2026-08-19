/* 3D WebGL Three.js Engine for Vinayak Vallabh Rai's Futuristic Portfolio */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js library not loaded. Retrying in 500ms...');
      setTimeout(init3D, 500);
      return;
    }
    init3D();
  });

  function init3D() {
    initBackgroundCanvas();
    initHeroObjectCanvas();
  }

  /* -------------------------------------------------------------
     1. ELEGANT 3D BACKGROUND PARTICLE & NEON NETWORK ENGINE
  ------------------------------------------------------------- */
  function initBackgroundCanvas() {
    let canvas = document.getElementById('webgl-bg');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'webgl-bg';
      document.body.prepend(canvas);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Subtle Particle Geometry
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color(0xbef264);
    const colorPurple = new THREE.Color(0xa855f7);
    const colorIndigo = new THREE.Color(0x6366f1);
    const colorCyan = new THREE.Color(0x38bdf8);

    const palette = [colorLime, colorPurple, colorIndigo, colorCyan];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800 - 100;

      const randomColor = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture Canvas
    const createParticleTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 32;
      pCanvas.height = 32;
      const ctx = pCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      grad.addColorStop(0.4, 'rgba(190, 242, 100, 0.6)');
      grad.addColorStop(0.8, 'rgba(168, 85, 247, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(pCanvas);
    };

    const material = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      map: createParticleTexture(),
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Elegant Distant Wireframe Ring Accents
    const ringGroup = new THREE.Group();
    
    const ringGeo1 = new THREE.TorusGeometry(120, 0.8, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.position.set(-200, 100, -200);
    ringMesh1.rotation.x = Math.PI / 3;
    ringGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(160, 0.6, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xbef264,
      wireframe: true,
      transparent: true,
      opacity: 0.06
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.position.set(250, -150, -300);
    ringMesh2.rotation.y = Math.PI / 4;
    ringGroup.add(ringMesh2);

    scene.add(ringGroup);

    // Mouse & Scroll Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.1;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.1;
    });

    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Rotate Background Rings
      ringMesh1.rotation.z = elapsedTime * 0.05;
      ringMesh2.rotation.x = elapsedTime * 0.04;

      particles.rotation.y = elapsedTime * 0.015 + mouseX * 0.0002;
      particles.rotation.x = elapsedTime * 0.01 - mouseY * 0.0002;

      // Camera parallax
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY - scrollY * 0.1 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }

  /* -------------------------------------------------------------
     2. HERO SECTION INTERACTIVE 3D GEOMETRIC OBJECT CANVAS
  ------------------------------------------------------------- */
  function initHeroObjectCanvas() {
    const container = document.getElementById('hero-3d-target');
    if (!container) return;

    // Clear existing canvas if re-initializing
    container.innerHTML = '';

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Outer Cyber Torus Knot + Inner Glowing Core
    const group = new THREE.Group();

    // 1. Torus Knot Wireframe
    const knotGeo = new THREE.TorusKnotGeometry(3.2, 0.75, 120, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xbef264,
      wireframe: true,
      emissive: 0x4d7c0f,
      roughness: 0.2,
      metalness: 0.8
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    group.add(knotMesh);

    // 2. Inner Glowing Core
    const coreGeo = new THREE.IcosahedronGeometry(2.0, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      shininess: 100,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 3. Orbiting Micro Particle Dust around Core
    const dustCount = 180;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4.5 + Math.random() * 1.5;
      dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPos[i * 3 + 2] = r * Math.cos(phi);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.16,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    group.add(dustPoints);

    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 3, 50);
    pointLightPurple.position.set(10, 10, 10);
    scene.add(pointLightPurple);

    const pointLightLime = new THREE.PointLight(0xbef264, 3, 50);
    pointLightLime.position.set(-10, -10, 10);
    scene.add(pointLightLime);

    // Interactive Mouse Tracking
    let isHovered = false;
    let heroMouseX = 0;
    let heroMouseY = 0;

    container.addEventListener('mouseenter', () => { isHovered = true; });
    container.addEventListener('mouseleave', () => { isHovered = false; heroMouseX = 0; heroMouseY = 0; });
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      heroMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      heroMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    let clock = new THREE.Clock();
    function animateHero() {
      requestAnimationFrame(animateHero);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const rotSpeed = isHovered ? 1.8 : 0.6;
      knotMesh.rotation.x += 0.4 * delta * rotSpeed;
      knotMesh.rotation.y += 0.6 * delta * rotSpeed;

      coreMesh.rotation.x -= 0.5 * delta * rotSpeed;
      coreMesh.rotation.z += 0.3 * delta * rotSpeed;

      dustPoints.rotation.y += 0.2 * delta;

      group.rotation.y += (heroMouseX * 1.2 - group.rotation.y) * 0.1;
      group.rotation.x += (heroMouseY * 1.2 - group.rotation.x) * 0.1;

      pointLightPurple.position.x = Math.sin(time * 2) * 12;
      pointLightPurple.position.z = Math.cos(time * 2) * 12;

      pointLightLime.position.x = Math.cos(time * 1.5) * 12;
      pointLightLime.position.y = Math.sin(time * 1.5) * 12;

      renderer.render(scene, camera);
    }
    animateHero();
  }

})();
