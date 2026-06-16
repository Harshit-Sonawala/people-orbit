"use client";
import React, { useEffect, useRef } from "react";
import { Heading } from "@/components";

const GlobeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height =
      canvas.clientHeight || canvas.offsetHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height =
        canvas.clientHeight || canvas.offsetHeight || 500;
    };
    window.addEventListener("resize", handleResize);

    // 1. 3D Globe Vertices Grid
    const globePoints: { x: number; y: number; z: number }[] = [];
    const globeRadius = 250; // Larger globe size
    const latitudeBands = 15;
    const longitudeBands = 26;

    for (let lat = 0; lat <= latitudeBands; lat++) {
      const theta = (lat * Math.PI) / latitudeBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon < longitudeBands; lon++) {
        const phi = (lon * 2 * Math.PI) / longitudeBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        globePoints.push({
          x: globeRadius * sinTheta * cosPhi,
          y: globeRadius * cosTheta,
          z: globeRadius * sinTheta * sinPhi,
        });
      }
    }

    // 2. 3D Network Nodes
    const particleCount = 80; // More particles for a denser network
    const particles: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1.2,
      });
    }

    const rotationSpeedY = 0.0012;
    const rotationSpeedX = 0.0003;
    const focalLength = 380;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Detect theme dynamic variables via computed styles
      const isDark = document.documentElement.classList.contains("dark");
      const computedStyle = getComputedStyle(document.documentElement);

      const primaryColor =
        (isDark
          ? computedStyle.getPropertyValue("--primary-alt")
          : computedStyle.getPropertyValue("--primary")
        ).trim() || (isDark ? "#27c1e4" : "#03abc9");

      const secondaryColor =
        computedStyle.getPropertyValue("--secondary").trim() ||
        (isDark ? "#05d0a0" : "#0aa380");

      const foregroundColor =
        computedStyle.getPropertyValue("--foreground").trim() ||
        (isDark ? "#f5f5f5" : "#222222");

      // Dynamic opacity multipliers (stronger in light mode for visibility)
      const globeOpacity = isDark ? 0.15 : 0.32;
      const vertexOpacity = isDark ? 0.15 : 0.28;
      const nodeOpacity = isDark ? 0.45 : 0.65;

      // Rotate Globe on Y & X axes
      const cosY = Math.cos(rotationSpeedY);
      const sinY = Math.sin(rotationSpeedY);
      const cosX = Math.cos(rotationSpeedX);
      const sinX = Math.sin(rotationSpeedX);

      globePoints.forEach((p) => {
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      // 3D projection mapping
      const projectedGlobe = globePoints.map((p) => {
        const scale =
          focalLength / Math.max(1, focalLength + p.z + globeRadius);
        return {
          x: width / 2 + p.x * scale,
          y: height / 2 + p.y * scale,
          z: p.z,
          scale,
        };
      });

      // Draw latitude lines
      ctx.lineWidth = 1.6; // Even thicker globe lines
      ctx.strokeStyle = primaryColor;
      for (let lat = 0; lat <= latitudeBands; lat++) {
        ctx.beginPath();
        ctx.globalAlpha = globeOpacity;
        for (let lon = 0; lon <= longitudeBands; lon++) {
          const idx = lat * longitudeBands + (lon % longitudeBands);
          const p = projectedGlobe[idx];
          if (!p) continue;
          if (lon === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lon = 0; lon < longitudeBands; lon++) {
        ctx.beginPath();
        ctx.globalAlpha = globeOpacity;
        for (let lat = 0; lat <= latitudeBands; lat++) {
          const idx = lat * longitudeBands + lon;
          const p = projectedGlobe[idx];
          if (!p) continue;
          if (lat === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw globe vertex points
      projectedGlobe.forEach((p) => {
        if (p.z < 0) {
          // Render only front-facing nodes for visual clarity
          const opacity = (1 + p.z / globeRadius) * (isDark ? 0.4 : 0.65);
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.1, 1.6 * p.scale), 0, 2 * Math.PI);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = opacity;
          ctx.fill();
        }
      });

      // Project and update drift nodes (network constellation)
      const projectedParticles = particles.map((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce boundaries
        const boundX = width * 0.7;
        const boundY = height * 0.7;
        if (Math.abs(p.x) > boundX) p.vx *= -1;
        if (Math.abs(p.y) > boundY) p.vy *= -1;
        if (Math.abs(p.z) > 300) p.vz *= -1;

        // Slowly rotate constellation particles
        const rx = p.x * Math.cos(0.0003) - p.z * Math.sin(0.0003);
        const rz = p.z * Math.cos(0.0003) + p.x * Math.sin(0.0003);
        p.x = rx;
        p.z = rz;

        const scale = focalLength / Math.max(1, focalLength + p.z + 250);
        return {
          x: width / 2 + p.x * scale,
          y: height / 2 + p.y * scale,
          z: p.z,
          scale,
          size: p.size,
        };
      });

      // Draw constellation vertices (connecting lines)
      ctx.lineWidth = 1.0; // Thicker lines
      ctx.strokeStyle = secondaryColor;
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 160) {
            const opacity = (1 - dist / 160) * vertexOpacity;
            ctx.beginPath();
            ctx.globalAlpha = opacity;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw constellation nodes
      projectedParticles.forEach((p) => {
        const depthOpacity = Math.max(
          0.1,
          (focalLength + p.z) / (focalLength * 2),
        );
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          Math.max(0.1, p.size * p.scale * 1.5),
          0,
          2 * Math.PI,
        );
        ctx.fillStyle = secondaryColor;
        ctx.globalAlpha = depthOpacity * nodeOpacity;
        ctx.fill();

        // Node center cores
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          Math.max(0.1, p.size * p.scale * 0.4),
          0,
          2 * Math.PI,
        );
        ctx.fillStyle = foregroundColor;
        ctx.globalAlpha = 1.0;
        ctx.fill();
      });

      // Restore full alpha
      ctx.globalAlpha = 1.0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export const LandingHero = () => {
  return (
    <div className="relative -z-10 bg-[radial-gradient(circle_at_center,var(--surface-top)_0%,transparent_75%)] -mt-24 pt-10 flex flex-col items-center justify-center min-h-125">
      {/* Globe & Network Canvas Background */}
      <div className="absolute inset-y-0 left-[calc(50%-50vw)] w-screen -z-10 overflow-hidden pointer-events-none">
        <GlobeCanvas />

        {/* Top-to-Bottom Gradient Overlay to fade into the page background color */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-65% to-background" />
      </div>

      {/* Hero Title and Subtitle */}
      <div className="p-6 md:p-20 max-w-6xl mx-auto flex flex-col gap-4 w-full">
        <Heading variant="lg" className="text-foreground sm:text-6xl">
          {`Find and connect with all the stars in your orbit.`}
        </Heading>
        <Heading className="text-primary-alt font-medium">
          {`Discover, connect, and explore our community. Network with professionals from all over the globe.`}
        </Heading>
      </div>
    </div>
  );
};
