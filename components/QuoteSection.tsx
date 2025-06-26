"use client";
import { useEffect, useState } from "react";

const QUOTES = [
  "Health is the greatest gift, contentment the greatest wealth. — Buddha",
  "The groundwork for all happiness is good health. — Leigh Hunt",
  "To keep the body in good health is a duty… otherwise we shall not be able to keep our mind strong and clear. — Buddha",
  "It is health that is real wealth and not pieces of gold and silver. — Mahatma Gandhi",
  "Take care of your body. It's the only place you have to live. — Jim Rohn",
  "A healthy outside starts from the inside. — Robert Urich",
  "The best doctor gives the least medicines. — Benjamin Franklin",
  "He who has health has hope; and he who has hope has everything. — Arabian Proverb",
  "Good health and good sense are two of life's greatest blessings. — Publilius Syrus",
  "Your health is an investment, not an expense. — Unknown",
];

export default function QuoteSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-center bg-gradient-to-r from-primary/10 via-background to-green-100/10 py-3 px-2 border-b border-border animate-fade-in">
      <blockquote className="max-w-2xl text-center italic text-base sm:text-lg text-primary font-medium drop-shadow-sm">
        {QUOTES[index]}
      </blockquote>
    </div>
  );
} 