"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PawPrint, Sparkles } from "lucide-react";
import Link from "next/link";

// 手绘风格的小猪与桌子 Logo - 动画加强版
const TablePigLogo = () => (
  <motion.svg 
    width="200" height="200" viewBox="0 0 200 200" fill="none" 
    xmlns="http://www.w3.org/2000/svg" className="mx-auto cursor-pointer overflow-visible"
    whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
    whileTap={{ scale: 0.95, rotate: -5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {/* 桌腿 */}
    <path d="M70 140 L68 165" stroke="#3D2B1F" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
    <path d="M130 140 L132 165" stroke="#3D2B1F" strokeWidth="4" strokeLinecap="round" opacity="0.4"/>
    
    <motion.g
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -3, 0], 
        scale: [1, 1.01, 1] 
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 3, 
        ease: "easeInOut" 
      }}
    >
      <motion.path 
        d="M75 130 Q100 60 125 130 Z" 
        fill="#FCE4EC" 
        stroke="#3D2B1F" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      
      <motion.circle 
        cx="100" cy="85" r="28" 
        fill="#FCE4EC" 
        stroke="#3D2B1F" 
        strokeWidth="4"
      />
      
      <motion.path 
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        d="M80 65 Q70 45 90 60" fill="#FCE4EC" stroke="#3D2B1F" strokeWidth="3" strokeLinecap="round"
        style={{ originX: "90px", originY: "60px" }}
      />
      <motion.path 
        animate={{ rotate: [2, -2, 2] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        d="M120 65 Q130 45 110 60" fill="#FCE4EC" stroke="#3D2B1F" strokeWidth="3" strokeLinecap="round"
        style={{ originX: "110px", originY: "60px" }}
      />
      
      <motion.g 
        animate={{ 
          scale: [1, 1.05, 1],
          y: [0, -1, 0] 
        }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ originX: "100px", originY: "95px" }}
      >
        <ellipse cx="100" cy="95" rx="12" ry="8" fill="#F28482" stroke="#3D2B1F" strokeWidth="3"/>
        <circle cx="95" cy="95" r="1.5" fill="#3D2B1F"/>
        <circle cx="105" cy="95" r="1.5" fill="#3D2B1F"/>
      </motion.g>
      
      <motion.circle 
        animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          times: [0, 0.4, 0.5, 0.6, 1],
          ease: "easeInOut"
        }}
        cx="88" cy="82" r="2.5" fill="#3D2B1F"
      />
      <motion.circle 
        animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          times: [0, 0.4, 0.5, 0.6, 1],
          ease: "easeInOut"
        }}
        cx="112" cy="82" r="2.5" fill="#3D2B1F"
      />
    </motion.g>

    <path d="M35 140 Q100 132 165 140 L170 115 Q100 108 30 115 Z" fill="#D2B48C" stroke="#3D2B1F" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M50 140 L45 185" stroke="#3D2B1F" strokeWidth="5" strokeLinecap="round"/>
    <path d="M150 140 L155 185" stroke="#3D2B1F" strokeWidth="5" strokeLinecap="round"/>
  </motion.svg>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <main className="min-h-screen bg-pink-light" />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-pink-light relative overflow-hidden text-pencil">
      <Sparkles className="absolute top-10 left-10 text-pencil/10 w-20 h-20" />
      <PawPrint className="absolute bottom-20 right-20 text-pencil/5 w-40 h-40 -rotate-12" />

      <motion.div 
        key="home-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-note-yellow p-10 md:p-12 hand-drawn-border hand-drawn-shadow max-w-xl w-full text-center"
      >
        <div className="tape" />
        
        <header className="mb-12">
          <div className="flex justify-center -mb-2 scale-90 md:scale-100 transform -translate-y-4">
            <TablePigLogo />
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 relative z-10">
            TablePig
          </h1>
        </header>

        <section className="mb-12">
          <p className="text-2xl md:text-3xl font-black leading-tight">
            记录每一个奇思妙想，<br />
            守护 Mocha 的快乐时光。
          </p>
        </section>

        <nav className="flex flex-col gap-5 max-w-xs mx-auto relative z-10">
          <Link 
            href="/board" 
            className="group relative bg-[#52796F] p-5 rounded-2xl hand-drawn-border text-white font-black text-2xl hover:translate-x-1 hover:-translate-y-1 transition-all shadow-lg text-center"
          >
            进入家庭看板
            <div className="absolute inset-0 bg-pencil translate-x-1.5 translate-y-1.5 -z-10 rounded-2xl opacity-20" />
          </Link>
          <Link 
            href="/mocha" 
            className="group relative bg-white p-5 rounded-2xl hand-drawn-border text-pencil font-black text-2xl hover:translate-x-1 hover:-translate-y-1 transition-all shadow-md text-center"
          >
            遇见 Mocha
            <div className="absolute inset-0 bg-pencil translate-x-1.5 translate-y-1.5 -z-10 rounded-2xl opacity-20" />
          </Link>
        </nav>
      </motion.div>

      <footer className="mt-16 opacity-30 font-black text-sm tracking-widest uppercase">
        Built with ❤️ for TablePig
      </footer>
    </main>
  );
}
