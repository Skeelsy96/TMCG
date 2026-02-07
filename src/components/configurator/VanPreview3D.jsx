import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VanPreview3D({ configuration }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const vanGroupRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(6, 4, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xe0e0e0,
      roughness: 0.8 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create van group
    const vanGroup = new THREE.Group();
    vanGroupRef.current = vanGroup;
    scene.add(vanGroup);

    // Build van based on configuration
    buildVan(vanGroup, configuration);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse controls
    const handleMouseDown = (e) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      
      vanGroup.rotation.y += deltaX * 0.01;
      vanGroup.rotation.x += deltaY * 0.01;
      
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e) => {
      if (!camera) return;
      const factor = e.deltaY < 0 ? 0.9 : 1.1;
      camera.position.multiplyScalar(factor);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    /* wheel zoom disabled - use + / - buttons */

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Update van when configuration changes
  useEffect(() => {
    if (vanGroupRef.current && configuration) {
      // Clear existing van
      while (vanGroupRef.current.children.length > 0) {
        vanGroupRef.current.remove(vanGroupRef.current.children[0]);
      }
      buildVan(vanGroupRef.current, configuration);
    }
  }, [configuration]);

  const buildVan = (group, config) => {
    if (!config.vanModel) return;

    const dimensions = config.vanModel.dimensions;
    const primaryColor = new THREE.Color(config.branding?.primaryColor || '#FDD202');
    const secondaryColor = new THREE.Color(config.branding?.secondaryColor || '#000000');

    // Van body
    const bodyGeometry = new THREE.BoxGeometry(dimensions.width, 2, dimensions.length);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: primaryColor,
      metalness: 0.3,
      roughness: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    body.castShadow = true;
    group.add(body);

    // Roof
    const roofGeometry = new THREE.BoxGeometry(dimensions.width, 0.2, dimensions.length);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      metalness: 0.5,
      roughness: 0.5
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.1;
    roof.castShadow = true;
    group.add(roof);

    // Serving window
    const windowGeometry = new THREE.BoxGeometry(1, 0.8, 0.1);
    const windowMaterial = new THREE.MeshStandardMaterial({ 
      color: secondaryColor,
      metalness: 0.8,
      roughness: 0.2
    });
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(0, 1.2, dimensions.length / 2 + 0.05);
    group.add(window);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a,
      roughness: 0.9
    });
    
    const wheelPositions = [
      [-dimensions.width / 2 + 0.3, 0.3, dimensions.length / 3],
      [dimensions.width / 2 - 0.3, 0.3, dimensions.length / 3],
      [-dimensions.width / 2 + 0.3, 0.3, -dimensions.length / 3],
      [dimensions.width / 2 - 0.3, 0.3, -dimensions.length / 3],
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      wheel.castShadow = true;
      group.add(wheel);
    });

    // Interior equipment (simplified visualization)
    if (config.layout?.appliances) {
      config.layout.appliances.forEach(appliance => {
        const equipGeometry = new THREE.BoxGeometry(
          appliance.width * 0.8,
          0.6,
          appliance.depth * 0.8
        );
        const equipMaterial = new THREE.MeshStandardMaterial({ 
          color: appliance.color || 0x808080,
          roughness: 0.5
        });
        const equip = new THREE.Mesh(equipGeometry, equipMaterial);
        
        // Position relative to van interior
        equip.position.set(
          (appliance.x - dimensions.width / 2) * 0.8,
          0.8,
          (appliance.y - dimensions.length / 2) * 0.8
        );
        group.add(equip);
      });
    }

    // Benchtop material indicator
    const benchtopGeometry = new THREE.BoxGeometry(dimensions.width * 0.9, 0.05, 0.6);
    let benchtopColor = 0xc0c0c0; // stainless steel
    if (config.materials?.benchtop === 'timber') benchtopColor = 0x8B6F47;
    if (config.materials?.benchtop === 'black-granite') benchtopColor = 0x1a1a1a;
    
    const benchtopMaterial = new THREE.MeshStandardMaterial({ 
      color: benchtopColor,
      metalness: config.materials?.benchtop === 'stainless-steel' ? 0.8 : 0.2,
      roughness: 0.3
    });
    const benchtop = new THREE.Mesh(benchtopGeometry, benchtopMaterial);
    benchtop.position.set(0, 0.9, -dimensions.length / 4);
    group.add(benchtop);
  };

  const resetCamera = () => {
    if (cameraRef.current && vanGroupRef.current) {
      cameraRef.current.position.set(6, 4, 8);
      cameraRef.current.lookAt(0, 0, 0);
      vanGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(0.9);
    }
  };

  const zoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.multiplyScalar(1.1);
    }
  };

  return (
    <div className="relative">
      <div 
        ref={mountRef} 
        className="w-full h-[500px] rounded-xl overflow-hidden border border-[#DBDBDB] bg-[#F5F5F5]"
        style={{ cursor: 'grab' }}
      />
      
      <div className="absolute top-4 right-4 flex gap-2">
        <Button 
          onClick={resetCamera}
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button 
          onClick={zoomIn}
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button 
          onClick={zoomOut}
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
        Click and drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}