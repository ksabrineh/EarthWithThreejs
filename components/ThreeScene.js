"use client";
import { useRef, useEffect } from "react";

import * as THREE from "three";
import { TextureLoader } from "three";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, and Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Load Textures
    const loader = new TextureLoader();
    const cloudsTexture = loader.load("/textures/cloud.jpg");

    // Optional: Create Clouds Sphere
    const cloudsGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const cloudsMaterial = new THREE.MeshLambertMaterial({
      map: cloudsTexture,
      transparent: true,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(cloudsMesh);

    // Add Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5).normalize();
    scene.add(directionalLight);

    camera.position.z = 3;

    // Animate the Earth and Clouds
    const animate = () => {
      requestAnimationFrame(animate);
      cloudsMesh.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on component unmount
    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full" />;
};

export default ThreeScene;
