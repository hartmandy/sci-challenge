import React from "react";

// NOTE: Added my own animation which renders five cards with different rotation and animation delay
const CardLoader = () => {
  const cards = Array(5).fill(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center -translate-x-24 -translate-y-40">
      <div className="relative flex space-x-6">
        {cards.map((_, index) => {
          const rotation = index % 2 === 0 ? "-3deg" : "3deg";
          return (
            <div
              key={index}
              className="relative"
              style={{
                transform: `rotate(${rotation})`,
              }}
            >
              <div
                className="absolute top-0 left-0 w-40 h-56 bg-accent rounded-xl shadow-2xl opacity-0 animate-shadow border"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardLoader;
