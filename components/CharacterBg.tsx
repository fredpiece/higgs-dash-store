'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Character {
  name: string;
  imagePath: string;
  title: string;
  color: string;
  bgGradient: string;
}

export default function CharacterBg() {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);

  const characters: Character[] = [
    {
      name: 'luffy',
      imagePath: 'https://img1.pngegg.com/download/16/a03f84f8dcc0ce2bdc91f3f0cff96f4f/luffy-png-1.png',
      title: 'Monkey D. Luffy - The Adventurer',
      color: '#FF6B6B',
      bgGradient: 'from-red-600 to-black',
    },
    {
      name: 'bogard',
      imagePath: 'https://img1.pngegg.com/download/d8/3e9cdef92a55652b43f3f3f3f3f3f3f3/mihawk-png-1.png',
      title: 'Dracule Mihawk - The Swordsman',
      color: '#4A90E2',
      bgGradient: 'from-blue-700 to-black',
    },
    {
      name: 'allen-iverson',
      imagePath: 'https://img1.pngegg.com/download/5e/7a9c8d9e4f3a2b1c0d8e7f6a5b4c3d2e/allen-iverson-png-1.png',
      title: 'Allen Iverson - The Answer',
      color: '#CE1141',
      bgGradient: 'from-red-700 via-blue-700 to-black',
    },
  ];

  useEffect(() => {
    // Randomly select a character on mount
    setCurrentCharacter(characters[Math.floor(Math.random() * characters.length)]);
  }, []);

  if (!currentCharacter) return null;

  return (
    <div className={`relative w-full h-96 bg-gradient-to-b ${currentCharacter.bgGradient} rounded-lg overflow-hidden border-4 border-yellow-400 shadow-2xl flex items-center justify-center`}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 text-4xl">🏴‍☠️</div>
        <div className="absolute bottom-4 left-4 text-4xl">💍</div>
        <div className="absolute top-1/2 right-10 text-6xl opacity-10">👑</div>
      </div>

      {/* Character PNG Container - Now with real images */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="relative w-56 h-80 flex items-center justify-center">
          <Image
            src={currentCharacter.imagePath}
            alt={currentCharacter.title}
            width={224}
            height={320}
            className="object-contain drop-shadow-2xl"
            priority
            unoptimized
          />
        </div>

        {/* Character Title */}
        <div className="absolute bottom-6 text-center z-20">
          <p className="text-white font-bold text-lg">{currentCharacter.title}</p>
          <p className="text-yellow-400 text-sm font-semibold">Available Now</p>
        </div>
      </div>

      {/* Animated border glow */}
      <style jsx>{`
        @keyframes borderGlow {
          0%, 100% {
            box-shadow: inset 0 0 20px rgba(255, 215, 61, 0.3), 0 0 20px rgba(255, 215, 61, 0.2);
          }
          50% {
            box-shadow: inset 0 0 30px rgba(255, 215, 61, 0.5), 0 0 30px rgba(255, 215, 61, 0.4);
          }
        }

        div {
          animation: borderGlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
