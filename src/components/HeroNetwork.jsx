import React, { useEffect, useRef } from 'react';

const NODE_COUNT_DESKTOP = 34;
const NODE_COUNT_MOBILE = 18;
const CONNECTION_DISTANCE = 220;
const TRAIL_COUNT = 4;

const createNodes = (width, height, count) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    radius: 2 + Math.random() * 2.2,
    glowPhase: Math.random() * Math.PI * 2,
    glowSpeed: 0.008 + Math.random() * 0.018,
  }));

const createTrails = (nodes, count) => {
  if (nodes.length < 2) return [];

  return Array.from({ length: count }, (_, index) => {
    const startIndex = Math.floor((index / count) * nodes.length);
    const endIndex = (startIndex + Math.max(3, Math.floor(nodes.length / 5))) % nodes.length;

    return {
      from: startIndex,
      to: endIndex,
      progress: Math.random(),
      speed: 0.0012 + Math.random() * 0.0018,
    };
  });
};

const HeroNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    let animationFrame;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let trails = [];
    let lastTimestamp = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.offsetWidth;
      height = parent.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
      nodes = createNodes(width, height, count);
      trails = createTrails(nodes, width < 768 ? 2 : TRAIL_COUNT);
    };

    const drawFrame = (timestamp) => {
      const delta = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 16.67, 2) : 1;
      lastTimestamp = timestamp;

      context.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx * delta;
        node.y += node.vy * delta;
        node.glowPhase += node.glowSpeed * delta;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;

        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      }

      const activeConnections = [];

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.56;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(186, 230, 253, ${opacity})`;
            context.lineWidth = 1.3;
            context.stroke();
            activeConnections.push([a.x, a.y, b.x, b.y, opacity]);
          }
        }
      }

      for (const trail of trails) {
        const startNode = nodes[trail.from];
        const endNode = nodes[trail.to];
        if (!startNode || !endNode) continue;

        trail.progress += trail.speed * delta * 16.67;
        if (trail.progress > 1) trail.progress = 0;

        const x = startNode.x + (endNode.x - startNode.x) * trail.progress;
        const y = startNode.y + (endNode.y - startNode.y) * trail.progress;

        context.beginPath();
        context.arc(x, y, 2.4, 0, Math.PI * 2);
        context.fillStyle = 'rgba(241, 90, 36, 0.95)';
        context.shadowColor = 'rgba(241, 90, 36, 0.55)';
        context.shadowBlur = 16;
        context.fill();
        context.shadowBlur = 0;

        context.beginPath();
        context.moveTo(startNode.x, startNode.y);
        context.lineTo(x, y);
        context.strokeStyle = 'rgba(241, 90, 36, 0.16)';
        context.lineWidth = 1;
        context.stroke();
      }

      for (let i = 0; i < Math.min(activeConnections.length, 12); i += 1) {
        const [x1, y1, x2, y2, opacity] = activeConnections[i];
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        context.beginPath();
        context.arc(mx, my, 1.2, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
        context.fill();
      }

      for (const node of nodes) {
        const pulse = (Math.sin(node.glowPhase) + 1) / 2;
        const glow = 0.12 + pulse * 0.88;
        const haloSize = node.radius * (2.8 + pulse * 4.2);

        context.beginPath();
        context.arc(node.x, node.y, haloSize, 0, Math.PI * 2);
        context.fillStyle = `rgba(34, 211, 238, ${0.04 + glow * 0.12})`;
        context.fill();

        context.beginPath();
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(248, 250, 252, ${0.16 + glow * 0.84})`;
        context.shadowColor = `rgba(34, 211, 238, ${0.18 + glow * 0.35})`;
        context.shadowBlur = 8 + glow * 12;
        context.fill();
        context.shadowBlur = 0;
      }

      animationFrame = window.requestAnimationFrame(drawFrame);
    };

    resize();
    animationFrame = window.requestAnimationFrame(drawFrame);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" aria-hidden="true" />
    </div>
  );
};

export default HeroNetwork;
