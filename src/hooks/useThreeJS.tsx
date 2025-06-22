import { useRef, useEffect } from "react";
import * as THREE from "three";

export function useThreeJS(isActive: boolean) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const meshRef = useRef<THREE.Mesh>();
  const animationRef = useRef<number>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    if (!mountRef.current || !isActive) return;

    // three 캔버스 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // 카메라 세팅
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // 렌더링
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // 오브젝트 생성
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // 오브젝트 재질
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color(0xff0080) },
        colorB: { value: new THREE.Color(0x0070f3) },
        colorC: { value: new THREE.Color(0x00d4ff) },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          vec3 newPosition = position;
          
          // Create morphing effect with sine waves
          float noise = sin(position.x * 3.0 + time) * 
                       sin(position.y * 2.0 + time * 1.2) * 
                       sin(position.z * 4.0 + time * 0.8) * 0.2;
          
          newPosition += normal * noise;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float mixValue = sin(vPosition.x + time) * 0.5 + 0.5;
          float mixValue2 = cos(vPosition.y + time * 1.5) * 0.5 + 0.5;
          
          vec3 color = mix(colorA, colorB, mixValue);
          color = mix(color, colorC, mixValue2);
          
          // Add some lighting effect
          float light = dot(vNormal, vec3(0.5, 0.5, 1.0)) * 0.5 + 0.5;
          color *= light;
          
          gl_FragColor = vec4(color, 0.8);
        }
      `,
      transparent: true,
    });

    // 오브젝트 생성
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // 빛 추가
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 애니메이션
    const animate = () => {
      if (!isActive) return;

      const time = Date.now() * 0.001;

      if (meshRef.current) {
        // 돌리기
        meshRef.current.rotation.x = time * 0.3;
        meshRef.current.rotation.y = time * 0.2;

        if (meshRef.current.material instanceof THREE.ShaderMaterial) {
          meshRef.current.material.uniforms.time.value = time;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        // 다른 슬라이드일때 메모리 삭제
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }

      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, [isActive]);

  // 오브젝트 변경
  const changeObjects = () => {
    if (
      meshRef.current &&
      meshRef.current.material instanceof THREE.ShaderMaterial
    ) {
      const geometries = [
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.BoxGeometry(1.5, 1.5, 1.5),
        new THREE.ConeGeometry(1, 2, 8),
        new THREE.TorusGeometry(1, 0.4, 16, 100),
        new THREE.OctahedronGeometry(1.2),
      ];

      const currentGeometry = meshRef.current.geometry;
      const randomGeometry =
        geometries[Math.floor(Math.random() * geometries.length)];

      meshRef.current.geometry.dispose();
      meshRef.current.geometry = randomGeometry;
    }
  };

  const changeColors = () => {
    if (
      meshRef.current &&
      meshRef.current.material instanceof THREE.ShaderMaterial
    ) {
      const colorSets = [
        { a: 0xff0080, b: 0x0070f3, c: 0x00d4ff },
        { a: 0x7928ca, b: 0xff0080, c: 0x0070f3 },
        { a: 0x00d4ff, b: 0x7928ca, c: 0xff0080 },
        { a: 0x0070f3, b: 0x00d4ff, c: 0x7928ca },
        { a: 0xff6b6b, b: 0x4ecdc4, c: 0x45b7d1 },
      ];

      const randomSet = colorSets[Math.floor(Math.random() * colorSets.length)];

      meshRef.current.material.uniforms.colorA.value.setHex(randomSet.a);
      meshRef.current.material.uniforms.colorB.value.setHex(randomSet.b);
      meshRef.current.material.uniforms.colorC.value.setHex(randomSet.c);
    }
  };

  return {
    mountRef,
    changeObjects,
    changeColors,
  };
}
