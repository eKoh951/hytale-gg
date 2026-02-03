"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Minecraft/Hytale-style terrain grass divider
 * Creates 2 layers of grass and 2 layers of dirt with 10x10 pixel blocks
 */
export function TerrainDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={cn("relative w-full overflow-hidden", flip && "rotate-180", className)}>
      {/* Terrain layers - 2 grass + 2 dirt with uniform 10x10px blocks */}
      <svg
        className="w-full"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Layer 1: Grass blocks - 10x10px, varying green tones */}
        <rect x="0" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="10" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="20" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="30" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="40" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="50" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="60" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="70" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="80" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="90" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="100" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="110" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="120" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="130" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="140" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="150" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="160" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="170" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="180" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="190" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="200" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="210" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="220" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="230" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="240" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="250" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="260" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="270" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="280" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="290" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="300" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="310" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="320" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="330" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="340" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="350" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="360" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="370" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="380" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="390" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="400" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="410" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="420" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="430" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="440" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="450" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="460" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="470" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="480" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="490" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="500" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="510" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="520" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="530" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="540" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="550" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="560" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="570" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="580" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="590" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="600" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="610" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="620" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="630" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="640" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="650" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="660" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="670" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="680" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="690" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="700" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="710" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="720" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="730" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="740" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="750" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="760" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="770" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="780" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="790" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="800" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="810" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="820" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="830" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="840" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="850" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="860" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="870" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="880" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="890" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="900" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="910" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="920" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="930" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="940" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="950" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="960" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="970" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="980" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="990" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="1000" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="1010" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1020" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="1030" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1040" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="1050" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="1060" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1070" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="1080" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1090" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="1100" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="1110" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1120" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="1130" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1140" y="0" width="10" height="10" fill="#5A9C27" />
        <rect x="1150" y="0" width="10" height="10" fill="#6BA833" />
        <rect x="1160" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1170" y="0" width="10" height="10" fill="#8FCF4F" />
        <rect x="1180" y="0" width="10" height="10" fill="#7CBD3E" />
        <rect x="1190" y="0" width="10" height="10" fill="#5A9C27" />

        {/* Layer 2: Second grass layer - 10x10px, varying green tones */}
        <rect x="0" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="10" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="20" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="30" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="40" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="50" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="60" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="70" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="80" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="90" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="100" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="110" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="120" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="130" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="140" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="150" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="160" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="170" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="180" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="190" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="200" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="210" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="220" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="230" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="240" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="250" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="260" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="270" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="280" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="290" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="300" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="310" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="320" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="330" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="340" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="350" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="360" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="370" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="380" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="390" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="400" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="410" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="420" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="430" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="440" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="450" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="460" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="470" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="480" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="490" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="500" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="510" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="520" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="530" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="540" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="550" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="560" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="570" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="580" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="590" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="600" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="610" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="620" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="630" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="640" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="650" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="660" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="670" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="680" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="690" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="700" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="710" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="720" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="730" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="740" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="750" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="760" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="770" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="780" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="790" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="800" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="810" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="820" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="830" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="840" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="850" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="860" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="870" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="880" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="890" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="900" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="910" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="920" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="930" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="940" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="950" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="960" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="970" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="980" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="990" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="1000" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="1010" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="1020" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="1030" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="1040" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="1050" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="1060" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="1070" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="1080" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="1090" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="1100" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="1110" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="1120" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="1130" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="1140" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="1150" y="10" width="10" height="10" fill="#5A9C27" />
        <rect x="1160" y="10" width="10" height="10" fill="#6BA833" />
        <rect x="1170" y="10" width="10" height="10" fill="#7CBD3E" />
        <rect x="1180" y="10" width="10" height="10" fill="#8FCF4F" />
        <rect x="1190" y="10" width="10" height="10" fill="#7CBD3E" />

        {/* Layer 3: First dirt layer - 10x10px, varying brown tones */}
        <rect x="0" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="10" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="20" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="30" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="40" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="50" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="60" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="70" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="80" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="90" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="100" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="110" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="120" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="130" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="140" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="150" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="160" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="170" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="180" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="190" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="200" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="210" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="220" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="230" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="240" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="250" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="260" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="270" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="280" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="290" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="300" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="310" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="320" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="330" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="340" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="350" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="360" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="370" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="380" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="390" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="400" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="410" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="420" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="430" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="440" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="450" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="460" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="470" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="480" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="490" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="500" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="510" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="520" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="530" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="540" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="550" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="560" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="570" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="580" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="590" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="600" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="610" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="620" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="630" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="640" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="650" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="660" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="670" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="680" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="690" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="700" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="710" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="720" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="730" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="740" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="750" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="760" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="770" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="780" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="790" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="800" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="810" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="820" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="830" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="840" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="850" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="860" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="870" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="880" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="890" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="900" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="910" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="920" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="930" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="940" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="950" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="960" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="970" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="980" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="990" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="1000" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1010" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="1020" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="1030" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1040" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="1050" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1060" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="1070" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="1080" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1090" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="1100" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1110" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="1120" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="1130" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1140" y="20" width="10" height="10" fill="#6E5839" />
        <rect x="1150" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1160" y="20" width="10" height="10" fill="#9D7C4F" />
        <rect x="1170" y="20" width="10" height="10" fill="#7A6341" />
        <rect x="1180" y="20" width="10" height="10" fill="#8B6F47" />
        <rect x="1190" y="20" width="10" height="10" fill="#6E5839" />

        {/* Layer 4: Second dirt layer - 10x10px, darker brown tones */}
        <rect x="0" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="10" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="20" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="30" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="40" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="50" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="60" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="70" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="80" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="90" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="100" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="110" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="120" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="130" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="140" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="150" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="160" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="170" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="180" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="190" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="200" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="210" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="220" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="230" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="240" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="250" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="260" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="270" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="280" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="290" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="300" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="310" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="320" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="330" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="340" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="350" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="360" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="370" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="380" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="390" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="400" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="410" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="420" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="430" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="440" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="450" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="460" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="470" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="480" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="490" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="500" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="510" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="520" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="530" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="540" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="550" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="560" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="570" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="580" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="590" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="600" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="610" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="620" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="630" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="640" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="650" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="660" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="670" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="680" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="690" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="700" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="710" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="720" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="730" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="740" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="750" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="760" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="770" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="780" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="790" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="800" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="810" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="820" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="830" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="840" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="850" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="860" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="870" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="880" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="890" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="900" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="910" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="920" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="930" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="940" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="950" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="960" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="970" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="980" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="990" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1000" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="1010" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1020" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="1030" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1040" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="1050" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1060" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="1070" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1080" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="1090" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1100" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="1110" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1120" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="1130" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1140" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="1150" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1160" y="30" width="10" height="10" fill="#6E5839" />
        <rect x="1170" y="30" width="10" height="10" fill="#7A6341" />
        <rect x="1180" y="30" width="10" height="10" fill="#5C4A31" />
        <rect x="1190" y="30" width="10" height="10" fill="#7A6341" />
      </svg>
    </div>
  );
}

/**
 * Minecraft/Hytale-style footer terrain divider
 * Creates 2 layers of dirt and 2 layers of stone with 10x10 pixel blocks
 */
export function FooterTerrainDivider({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div className={cn("relative w-full overflow-hidden", flip && "rotate-180", className)}>
      {/* Terrain layers - 2 dirt + 2 stone with uniform 10x10px blocks */}
      <svg
        className="w-full"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Layer 1: Dirt blocks - 10x10px, varying brown tones */}
        <rect x="0" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="10" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="20" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="30" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="40" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="50" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="60" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="70" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="80" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="90" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="100" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="110" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="120" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="130" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="140" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="150" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="160" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="170" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="180" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="190" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="200" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="210" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="220" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="230" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="240" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="250" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="260" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="270" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="280" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="290" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="300" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="310" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="320" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="330" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="340" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="350" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="360" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="370" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="380" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="390" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="400" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="410" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="420" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="430" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="440" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="450" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="460" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="470" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="480" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="490" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="500" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="510" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="520" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="530" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="540" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="550" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="560" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="570" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="580" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="590" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="600" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="610" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="620" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="630" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="640" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="650" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="660" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="670" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="680" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="690" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="700" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="710" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="720" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="730" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="740" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="750" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="760" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="770" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="780" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="790" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="800" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="810" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="820" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="830" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="840" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="850" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="860" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="870" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="880" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="890" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="900" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="910" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="920" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="930" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="940" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="950" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="960" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="970" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="980" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="990" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="1000" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1010" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="1020" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="1030" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1040" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="1050" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1060" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="1070" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="1080" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1090" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="1100" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1110" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="1120" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="1130" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1140" y="0" width="10" height="10" fill="#6E5839" />
        <rect x="1150" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1160" y="0" width="10" height="10" fill="#9D7C4F" />
        <rect x="1170" y="0" width="10" height="10" fill="#7A6341" />
        <rect x="1180" y="0" width="10" height="10" fill="#8B6F47" />
        <rect x="1190" y="0" width="10" height="10" fill="#6E5839" />

        {/* Layer 2: Second dirt layer - 10x10px, darker brown tones */}
        <rect x="0" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="10" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="20" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="30" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="40" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="50" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="60" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="70" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="80" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="90" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="100" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="110" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="120" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="130" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="140" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="150" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="160" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="170" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="180" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="190" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="200" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="210" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="220" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="230" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="240" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="250" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="260" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="270" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="280" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="290" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="300" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="310" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="320" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="330" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="340" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="350" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="360" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="370" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="380" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="390" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="400" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="410" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="420" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="430" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="440" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="450" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="460" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="470" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="480" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="490" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="500" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="510" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="520" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="530" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="540" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="550" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="560" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="570" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="580" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="590" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="600" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="610" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="620" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="630" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="640" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="650" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="660" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="670" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="680" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="690" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="700" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="710" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="720" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="730" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="740" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="750" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="760" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="770" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="780" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="790" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="800" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="810" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="820" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="830" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="840" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="850" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="860" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="870" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="880" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="890" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="900" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="910" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="920" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="930" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="940" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="950" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="960" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="970" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="980" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="990" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1000" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="1010" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1020" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="1030" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1040" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="1050" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1060" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="1070" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1080" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="1090" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1100" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="1110" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1120" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="1130" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1140" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="1150" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1160" y="10" width="10" height="10" fill="#6E5839" />
        <rect x="1170" y="10" width="10" height="10" fill="#7A6341" />
        <rect x="1180" y="10" width="10" height="10" fill="#5C4A31" />
        <rect x="1190" y="10" width="10" height="10" fill="#7A6341" />

        {/* Layer 3: Stone blocks - 10x10px, varying grey tones */}
        <rect x="0" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="10" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="20" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="30" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="40" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="50" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="60" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="70" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="80" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="90" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="100" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="110" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="120" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="130" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="140" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="150" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="160" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="170" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="180" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="190" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="200" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="210" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="220" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="230" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="240" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="250" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="260" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="270" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="280" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="290" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="300" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="310" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="320" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="330" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="340" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="350" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="360" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="370" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="380" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="390" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="400" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="410" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="420" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="430" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="440" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="450" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="460" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="470" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="480" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="490" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="500" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="510" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="520" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="530" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="540" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="550" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="560" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="570" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="580" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="590" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="600" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="610" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="620" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="630" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="640" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="650" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="660" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="670" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="680" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="690" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="700" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="710" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="720" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="730" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="740" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="750" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="760" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="770" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="780" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="790" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="800" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="810" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="820" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="830" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="840" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="850" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="860" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="870" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="880" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="890" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="900" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="910" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="920" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="930" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="940" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="950" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="960" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="970" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="980" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="990" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="1000" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1010" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="1020" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="1030" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1040" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="1050" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1060" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="1070" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="1080" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1090" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="1100" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1110" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="1120" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="1130" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1140" y="20" width="10" height="10" fill="#7A7A7A" />
        <rect x="1150" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1160" y="20" width="10" height="10" fill="#6B6B6B" />
        <rect x="1170" y="20" width="10" height="10" fill="#4F4F4F" />
        <rect x="1180" y="20" width="10" height="10" fill="#5C5C5C" />
        <rect x="1190" y="20" width="10" height="10" fill="#7A7A7A" />

        {/* Layer 4: Second stone layer - 10x10px, darker grey tones */}
        <rect x="0" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="10" y="30" width="10" height="10" fill="#424242" />
        <rect x="20" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="30" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="40" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="50" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="60" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="70" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="80" y="30" width="10" height="10" fill="#424242" />
        <rect x="90" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="100" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="110" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="120" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="130" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="140" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="150" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="160" y="30" width="10" height="10" fill="#424242" />
        <rect x="170" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="180" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="190" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="200" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="210" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="220" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="230" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="240" y="30" width="10" height="10" fill="#424242" />
        <rect x="250" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="260" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="270" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="280" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="290" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="300" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="310" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="320" y="30" width="10" height="10" fill="#424242" />
        <rect x="330" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="340" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="350" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="360" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="370" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="380" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="390" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="400" y="30" width="10" height="10" fill="#424242" />
        <rect x="410" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="420" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="430" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="440" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="450" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="460" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="470" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="480" y="30" width="10" height="10" fill="#424242" />
        <rect x="490" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="500" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="510" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="520" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="530" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="540" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="550" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="560" y="30" width="10" height="10" fill="#424242" />
        <rect x="570" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="580" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="590" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="600" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="610" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="620" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="630" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="640" y="30" width="10" height="10" fill="#424242" />
        <rect x="650" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="660" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="670" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="680" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="690" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="700" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="710" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="720" y="30" width="10" height="10" fill="#424242" />
        <rect x="730" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="740" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="750" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="760" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="770" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="780" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="790" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="800" y="30" width="10" height="10" fill="#424242" />
        <rect x="810" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="820" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="830" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="840" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="850" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="860" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="870" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="880" y="30" width="10" height="10" fill="#424242" />
        <rect x="890" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="900" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="910" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="920" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="930" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="940" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="950" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="960" y="30" width="10" height="10" fill="#424242" />
        <rect x="970" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="980" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="990" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1000" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="1010" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1020" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="1030" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1040" y="30" width="10" height="10" fill="#424242" />
        <rect x="1050" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1060" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="1070" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1080" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="1090" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1100" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="1110" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1120" y="30" width="10" height="10" fill="#424242" />
        <rect x="1130" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1140" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="1150" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1160" y="30" width="10" height="10" fill="#5C5C5C" />
        <rect x="1170" y="30" width="10" height="10" fill="#4F4F4F" />
        <rect x="1180" y="30" width="10" height="10" fill="#3A3A3A" />
        <rect x="1190" y="30" width="10" height="10" fill="#4F4F4F" />
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
