"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [hearts, setHearts] = useState<Array<{ id: number; top: string; left: string; delay: string }>>([]);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between p-8"
      style={{ backgroundImage: "url('/image/homepage/cat.jpg')" }}
    >
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute text-red-500 text-2xl sm:text-4xl heart"
            style={{
              top: heart.top,
              left: heart.left,
              animationDelay: heart.delay,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Valentine's Message */}
     
      <h1 className="text-white text-4xl sm:text-5xl font-bold text-center animate-glow translate-y-12">
        ❤️ HAPPY VALENTINE'S DAY ❤️
      </h1>

      {/* Name in the Center */}
      <h2 className="text-white text-5xl sm:text-6xl font-bold text-center mt-20 animate-glow translate-y-16">
        My Love MeyNeang 💖
      </h2>

      {/* Click Me Button */}
      <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300 ease-in-out animate-bounce">
  Click Me 💕
</button>

   
      

      {/* Floating Hearts Animation */}
      <style jsx>{`
        .heart {
          animation: floatUp 5s infinite ease-in-out;
          position: absolute;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-40px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }

        .animate-glow {
          text-shadow: 0 0 10px #ff4a85, 0 0 20px #ff4a85, 0 0 30px #ff4a85;
        }
      `}</style>
    </div>
  );
}
