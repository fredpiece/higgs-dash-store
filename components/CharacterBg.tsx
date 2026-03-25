'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Character {
  name: string;
  imagePath: string;
  title: string;
  color: string;
}

export default function CharacterBg() {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);

  const characters: Character[] = [
    {
      name: 'luffy',
      imagePath: '/images/characters/luffy.svg',
      title: 'The Adventurer',
      color: '#FF6B6B',
    },
    {
      name: 'bogard',
      imagePath: '/images/characters/bogard.svg',
      title: 'The Guardian',
      color: '#4A90E2',
    },
    {
      name: 'world-b-free',
      imagePath: '/images/characters/world-b-free.svg',
      title: 'The Champion',
      color: '#CE1141',
    },
  ];

  useEffect(() => {
    // Randomly select a character on mount
    setCurrentCharacter(characters[Math.floor(Math.random() * characters.length)]);
  }, []);

  if (!currentCharacter) return null;

  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-600 to-black rounded-lg overflow-hidden border-4 border-yellow-400 shadow-2xl flex items-center justify-center">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 text-4xl">🏴‍☠️</div>
        <div className="absolute bottom-4 left-4 text-4xl">💍</div>
      </div>

      {/* Character SVG Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="relative w-48 h-64">
          <Image
            src={currentCharacter.imagePath}
            alt={currentCharacter.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 192px"
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
