"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

// Define domain card type
interface DomainCard {
  id: string;
  title: string;
  color: string;
  pattern: string;
  position: { x: number; y: number };
  tag?: string;
}

const ExpandingCards: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const domainCards: DomainCard[] = [
    { id: 'cp', title: 'CP', color: 'bg-gray-900', pattern: 'bg-[url(/patterns/cp-pattern.svg)]', position: { x: 250, y: 200 } },
    { id: 'mac', title: 'MAC', color: 'bg-yellow-400', pattern: 'bg-[url(/patterns/mac-pattern.svg)]', position: { x: 150, y: 150 }, tag: 'blah blah' },
    { id: 'design', title: 'Design', color: 'bg-red-400', pattern: 'bg-[url(/patterns/design-pattern.svg)]', position: { x: 50, y: 100 } },
    { id: 'web', title: 'Web', color: 'bg-blue-500', pattern: 'bg-[url(/patterns/web-pattern.svg)]', position: { x: 100, y: 0 } },
    { id: 'marketing', title: 'Management and Marketing', color: 'bg-green-400', pattern: 'bg-[url(/patterns/marketing-pattern.svg)]', position: { x: -50, y: 50 }, tag: 'blah blah' },
    { id: 'socials', title: 'Socials', color: 'bg-black', pattern: 'bg-[url(/patterns/social-pattern.svg)]', position: { x: -150, y: -50 }, tag: '@hieee' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="relative w-[400px] h-[500px] cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {!isExpanded && (
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            {domainCards.map((card, index) => (
              <motion.div
                key={card.id}
                className={`absolute w-56 h-72 rounded-xl shadow-lg ${card.color} border-2 border-white`}
                style={{ transform: `rotate(${(index - 2) * 5}deg)`, left: `${index * 5}px`, zIndex: index }}
              >
                <div className="flex items-center justify-center h-full text-white font-bold text-2xl">
                  {card.id === 'cp' && 'CP'}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <AnimatePresence>
          {isExpanded && (
            domainCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={{ x: card.position.x, y: card.position.y, opacity: 1, scale: 1 }}
                exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className={`absolute w-32 h-32 rounded-lg shadow-lg ${card.color}`}
              >
                <div className="h-full w-full flex flex-col justify-center items-center">
                  <div className="text-white font-medium text-center px-2">{card.title}</div>
                  {card.tag && <div className="text-xs text-white mt-1">{card.tag}</div>}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpandingCards;
