import React, { useState, useEffect } from "react";

const words = ["make", "your", "life", "better", "with", "to do app"];

const RotatingText: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center">
        {words.map((word, index) => (
          <span
            key={word}
            className={`inline-block transition-all duration-500 ${
              index === currentWordIndex
                ? "transform rotate-0 opacity-100 scale-100"
                : "transform rotate-90 opacity-0 scale-50"
            }`}
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default RotatingText;
