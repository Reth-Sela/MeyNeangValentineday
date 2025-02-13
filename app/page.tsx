"use client";
import { useRouter } from "next/navigation"; // ⏩ Import useRouter for navigation
import { useEffect, useState } from "react";

export default function Home() {
  const router =useRouter();
  const [hearts, setHearts] = useState<Array<{ id: number; top: string; left: string; delay: string }>>([]);
  const [showGift, setShowGift] = useState(false); // Gift modal state

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
        ❤️ HAPPY VALENTINE&apos;S DAY ❤️
      </h1>

      {/* Name in the Center */}
      <h2 className="text-white text-5xl sm:text-6xl font-bold text-center mt-20 animate-glow translate-y-16">
        My Love MeyNeang 💖
      </h2>

      {/* Buttons: Click Me & Gift (Flex Layout with Shine) */}
      <div className="flex gap-4 mt-10 relative">
        <button onClick={()=>router.push('/sweet-song')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300 ease-in-out animate-bounce">
          Click Me 💕
        </button>

        {/* Gift Button with Shine Effect */}
        <div className="relative">
          <button
            onClick={() => setShowGift(true)}
            className="relative bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300 ease-in-out animate-bounce"
          >
            🎁 Gift
          </button>

          {/* Shine Effect (No Click Block) */}
          <div className="absolute -inset-3 rounded-full bg-yellow-400 opacity-50 blur-lg animate-shine pointer-events-none"></div>
        </div>
      </div>

      {/* Surprise Gift Modal */}
      {showGift && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center w-full h-full">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md relative animate-modal">
            {/* Close Button */}
            <button
              onClick={() => setShowGift(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            >
              ✖
            </button>

            {/* Floating Hearts Inside Modal */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute text-red-500 text-xl sm:text-2xl heart-inside"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  🎁
                </span>
              ))}
            </div>

            {/* Gift Image Wrapper (Outer Shine Effect) */}
            <div className="relative flex items-center justify-center animate-bounceIn">
              {/* Outer Shine Effect */}
              <div className="absolute -inset-4 rounded-lg bg-yellow-300 opacity-60 blur-lg animate-lightPulse pointer-events-none"></div>

              {/* Surprise Image */}
              <img
                src="/image/homepage/gift.jpg"
                alt="Surprise Gift"
                className="rounded-lg shadow-lg w-64 h-64 object-cover mx-auto"
              />
            </div>

            {/* Message Below the Image */}
            <p className="text-center text-lg font-semibold mt-4 text-pink-500 animate-message">
  🎉 Surprise! Hope you enjoy it 💖
</p>

          </div>
        </div>
      )}

      {/* Floating Hearts Animation & Modal Effects */}
      <style jsx>{`
        .heart {
          animation: floatUp 5s infinite ease-in-out;
          position: absolute;
        }

        @keyframes messageBounce {
  0% { opacity: 0; transform: translateY(20px) scale(0.9); }
  60% { opacity: 1; transform: translateY(-5px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes messageGlow {
  0%, 100% { text-shadow: 0 0 5px #ff66b2, 0 0 10px #ff66b2; }
  50% { text-shadow: 0 0 10px #ff1493, 0 0 20px #ff1493; }
}

.animate-message {
  animation: messageBounce 0.8s ease-out, messageGlow 2s infinite alternate;
}


        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-40px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-80px) scale(1); opacity: 0; }
        }

        .animate-glow {
          text-shadow: 0 0 10px #ff4a85, 0 0 20px #ff4a85, 0 0 30px #ff4a85;
        }

        .animate-modal {
          animation: modalBounceIn 0.8s ease-out;
        }

        @keyframes modalBounceIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }

        .animate-lightPulse {
          animation: lightPulse 1.5s infinite alternate;
        }

    @keyframes lightPulse {
  0%, 80% { opacity: 0.2; transform: scale(1); }   /* Stay dim for 4s */
  100% { opacity: 0.7; transform: scale(1.05); }   /* Brighten up only for 1s */
}



        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }

        @keyframes bounceIn {
          0% { transform: scale(0.8) translateY(50px); opacity: 0; }
          70% { transform: scale(1.1) translateY(-10px); opacity: 1; }
          100% { transform: scale(1) translateY(0); }
        }

        .heart-inside {
          animation: floatUp 3s infinite ease-in-out;
          position: absolute;
        }
      `}</style>
    </div>
  );
}
