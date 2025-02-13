'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ⏪ Import useRouter for navigation
import { FaArrowLeft } from "react-icons/fa"; // ⬅️ Import back icon

export default function LoveLetter() {
  const router = useRouter(); // ⏪ For navigation
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 3}s`,
        size: `${Math.random() * 25 + 10}px`,
      }));
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-b from-pink-300 to-red-400 overflow-hidden">
      
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {hearts.map(({ id, left, duration, size }) => (
          <div
            key={id}
            className="absolute text-red-500 animate-float"
            style={{ left, animationDuration: duration, fontSize: size }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Love Letter Content (Centered) */}
      <div className="bg-white shadow-2xl rounded-3xl p-6 max-w-md w-full text-center relative z-10 border border-pink-300">
        <h1 className="text-2xl font-extrabold text-red-600 mb-3">
          A Message for You ❤️
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed font-medium">
          I just wanted to take a moment to appreciate everything you do. You're always there, always supportive, and I just want to say thank you.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-3">
          Life gets busy, but I hope you know how much you mean to me. No matter what happens, I'm grateful to have you around.
        </p>
        <p className="text-gray-900 font-semibold text-lg mt-4 drop-shadow-sm">
          Wishing you happiness, today and always. ❤️
        </p>

        <p className="mt-3 text-gray-600">- [OGLA]</p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/sweet-song")} // ⬅️ Change "/" to the actual previous page route
        className="absolute bottom-6 left-6 bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Floating Heart Animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-20px); opacity: 0.8; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
