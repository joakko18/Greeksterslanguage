"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  lng: string;
  imageSrc: string;
  imageAlt: string;
  frontTitle: string;
  frontDescription: string;
  backContent: React.ReactNode;
}

const ProjectCard = ({ frontTitle, frontDescription, backContent }: ProjectCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="relative w-full h-80 perspective-1000"
      onMouseEnter={handleFlip}
      onMouseLeave={handleFlip}
    >
      <motion.div
        /* === CHANGE 1: Use rounded-3xl for a more modern, softer corner shape === */
        className="absolute w-full h-full rounded-3xl shadow-xl"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front of the card */}
        <div
          /* === CHANGE 1: Use rounded-3xl for a more modern, softer corner shape === */
          className="absolute w-full h-full rounded-3xl overflow-hidden backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* The existing text overlay will now sit on an empty background */}
          {/* === CHANGE 2: Corrected opacity from /150 to /80 (opacity range is 0-100) === */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#889377]/80 to-transparent flex items-end p-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{frontTitle}</h3>
              <p className="text-gray-200 drop-shadow">{frontDescription}</p>
            </div>
          </div>
        </div>

        {/* Back of the card */}
        <div
          /* === CHANGE 1: Use rounded-3xl for a more modern, softer corner shape === */
          className="absolute w-full h-full bg-[#e4f1d4] rounded-3xl p-6 flex flex-col justify-center items-center text-center rotate-y-180"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {backContent}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;