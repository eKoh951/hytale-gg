"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Minecraft/Hytale-style terrain grass divider
 * Creates a blocky, voxel-like grass effect between sections
 */
export function TerrainDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={cn("relative w-full overflow-hidden", flip && "rotate-180", className)}>
      {/* Grass layer - voxel/blocky style */}
      <svg
        className="w-full"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 24V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V20h20V16h20V12h20V8h20V12h20V16h20V24H0Z"
          className="fill-grass"
        />
      </svg>
    </div>
  );
}

/**
 * Subtle floating particles with Hytale colors
 */
export function MagicParticles({ count = 20, className }: { count?: number; className?: string }) {
  const colors = ["#8B4FC1", "#FFB800", "#7CBD3E", "#5CC8E8", "#E85D75"];
  
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {[...Array(count)].map((_, i) => {
        const color = colors[i % colors.length];
        const size = Math.random() * 4 + 2;
        const delay = Math.random() * 15;
        const duration = Math.random() * 20 + 20;
        const startX = Math.random() * 100;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              left: `${startX}%`,
              bottom: "-10px",
              boxShadow: `0 0 ${size * 2}px ${color}40`,
            }}
            animate={{
              y: [0, -800],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Subtle glyph/rune pattern overlay
 * Uses CSS patterns for performance
 */
export function GlyphPattern({ className, opacity = 0.03 }: { className?: string; opacity?: number }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L35 15H25L30 5ZM15 20L10 30H20L15 20ZM45 20L40 30H50L45 20ZM30 25L35 35H25L30 25ZM10 40L5 50H15L10 40ZM50 40L45 50H55L50 40ZM30 45L35 55H25L30 45Z' fill='%238B4FC1' fill-opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

/**
 * Voxel-style corner decoration
 * Stacked blocks effect
 */
export function VoxelCorner({ 
  position, 
  className 
}: { 
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };

  return (
    <div className={cn("pointer-events-none absolute", positionClasses[position], className)}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        {/* Stone blocks */}
        <rect x="0" y="32" width="16" height="16" className="fill-[#4A4A4A]" />
        <rect x="0" y="16" width="16" height="16" className="fill-[#5C5C5C]" />
        <rect x="16" y="32" width="16" height="16" className="fill-[#5C5C5C]" />
        {/* Highlight edges */}
        <rect x="0" y="32" width="16" height="2" className="fill-[#6E6E6E]" />
        <rect x="0" y="16" width="16" height="2" className="fill-[#6E6E6E]" />
        <rect x="16" y="32" width="16" height="2" className="fill-[#6E6E6E]" />
        {/* Shadow edges */}
        <rect x="14" y="18" width="2" height="14" className="fill-[#3A3A3A]" />
        <rect x="30" y="34" width="2" height="14" className="fill-[#3A3A3A]" />
      </svg>
    </div>
  );
}

/**
 * Section divider with subtle sword/diamond icon
 */
export function IconDivider({ icon = "diamond", className }: { icon?: "diamond" | "sword" | "pickaxe"; className?: string }) {
  const icons = {
    diamond: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
        <path d="M12 2L22 9L12 22L2 9L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    sword: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
        <path d="M19 3L21 5L12 14L10 12L19 3ZM3 17L7 21L9 19L5 15L3 17ZM8 14L10 12L12 14L10 16L8 14Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    pickaxe: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-grass">
        <path d="M14.5 3.5L20.5 9.5L18 12L14 8L6 16L4 14L12 6L8 2L14.5 3.5Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  };

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      {icons[icon]}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

/**
 * Card with subtle stone border effect
 */
export function StoneCard({ 
  children, 
  className,
  glowColor = "primary"
}: { 
  children: React.ReactNode; 
  className?: string;
  glowColor?: "primary" | "secondary" | "grass";
}) {
  const glowColors = {
    primary: "hover:shadow-primary/20",
    secondary: "hover:shadow-secondary/20",
    grass: "hover:shadow-grass/20",
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border-2 border-[#3A3A3A] bg-card transition-all",
      "before:absolute before:inset-0 before:rounded-lg before:border before:border-[#5C5C5C]/30",
      "hover:border-[#4A4A4A]",
      glowColors[glowColor],
      className
    )}>
      {/* Top edge highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6E6E6E]/50 to-transparent" />
      {children}
    </div>
  );
}

/**
 * Pixel art corner accent (torch, crystal, gem)
 */
export function PixelCorner({ 
  type = "torch",
  position = "top-left",
  className 
}: { 
  type?: "torch" | "crystal" | "gem";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  const icons = {
    torch: (
      <motion.div
        className="relative"
        animate={{
          filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Torch flame */}
        <div className="h-2 w-2 bg-secondary rounded-sm shadow-[0_0_8px_rgba(255,184,0,0.6)]" />
        {/* Torch stick */}
        <div className="mx-auto mt-0.5 h-3 w-1 bg-dirt" />
      </motion.div>
    ),
    crystal: (
      <motion.div
        animate={{
          filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Crystal structure */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2L12 6L8 14L4 6L8 2Z" fill="#8B4FC1" opacity="0.8" />
          <path d="M8 2L12 6L8 8L4 6L8 2Z" fill="#A855F7" />
          <path d="M8 2L8 8" stroke="#C084FC" strokeWidth="0.5" />
        </svg>
      </motion.div>
    ),
    gem: (
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Pixelated gem */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="4" y="0" width="4" height="4" fill="#5CC8E8" />
          <rect x="2" y="4" width="8" height="4" fill="#4FB3D4" />
          <rect x="4" y="8" width="4" height="4" fill="#3A8FA8" />
          {/* Shine effect */}
          <rect x="5" y="1" width="2" height="2" fill="#FFFFFF" opacity="0.6" />
        </svg>
      </motion.div>
    ),
  };

  return (
    <div className={cn("pointer-events-none absolute", positionClasses[position], className)}>
      {icons[type]}
    </div>
  );
}

/**
 * Animated torch/lantern glow effect
 */
export function TorchGlow({ 
  position = "right",
  className 
}: { 
  position?: "left" | "right";
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute top-1/2 h-32 w-32 -translate-y-1/2 rounded-full",
        position === "left" ? "-left-16" : "-right-16",
        className
      )}
      style={{
        background: "radial-gradient(circle, rgba(255,184,0,0.15) 0%, transparent 70%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
