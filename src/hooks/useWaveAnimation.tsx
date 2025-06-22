import { useRef, useEffect } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxRadius: number;
}

export function useWaveAnimation(isActive: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ripplesRef = useRef<Ripple[]>([]);
  const lastRippleTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 마우스 화면 센터 위치
      mouseRef.current.x = canvas.width / 2;
      mouseRef.current.y = canvas.height / 2;
    };

    // 움직임 체크 및 파동 리스트업
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const now = Date.now();
      if (now - lastRippleTime.current > 100) {
        ripplesRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          radius: 0,
          opacity: 1,
          maxRadius: Math.random() * 100 + 150,
        });
        lastRippleTime.current = now;
      }
    };

    const animate = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      // 파동 그리기
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + time * 0.3;
        const centerX = canvas.width / 2 + Math.cos(angle) * 100;
        const centerY = canvas.height / 2 + Math.sin(angle) * 60;

        for (let ring = 0; ring < 3; ring++) {
          const radius = 50 + ring * 40 + Math.sin(time + i + ring) * 20;
          const opacity =
            (0.1 - ring * 0.02) * (0.5 + Math.sin(time + i) * 0.3);

          const innerRadius = Math.max(0, radius - 10);
          const outerRadius = radius + 10;
          const gradient = ctx.createRadialGradient(
            centerX,
            centerY,
            innerRadius,
            centerX,
            centerY,
            outerRadius
          );
          gradient.addColorStop(0, `rgba(59, 130, 246, 0)`);
          gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity})`);
          gradient.addColorStop(1, `rgba(255, 0, 128, 0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 파동 업데이트
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];

        ripple.radius += 5;
        ripple.opacity = Math.max(0, 1 - ripple.radius / ripple.maxRadius);

        if (ripple.opacity <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        const innerRadius = Math.max(0, ripple.radius - 15);
        const outerRadius = ripple.radius + 15;
        const gradient = ctx.createRadialGradient(
          ripple.x,
          ripple.y,
          innerRadius,
          ripple.x,
          ripple.y,
          outerRadius
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, 0)`);
        gradient.addColorStop(
          0.5,
          `rgba(139, 92, 246, ${ripple.opacity * 0.8})`
        );
        gradient.addColorStop(1, `rgba(255, 0, 128, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (ripple.radius > 20) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius - 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 마우스 위치
      const glowGradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        30
      );
      glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
      glowGradient.addColorStop(0.7, "rgba(139, 92, 246, 0.3)");
      glowGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 30, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return canvasRef;
}
