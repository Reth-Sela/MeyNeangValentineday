'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPause, FaMusic, FaSync, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images: string[] = [
  "/image/sweet-song/pic3.jpg",
  "/image/sweet-song/pic5.jpg",
  "/image/sweet-song/pic6.jpg",
];

const songs: string[] = [
  "/audio/babe.mp3",
  "/audio/tonghau.mp3",
  "/audio/laosuaitami.mp3",
];

const Home: React.FC = () => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(true); // ✅ Auto-play enabled
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [hearts, setHearts] = useState<{ id: number; left: string; top: string; duration: string; size: string }[]>([]);

  // ✅ FIXED: Auto slideshow now works on page load
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // Auto change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = document.getElementById("loveSong") as HTMLAudioElement | null;
    if (audio) {
      const playAudio = () => {
        audio.volume = 0.7;
        audio.play().catch((error) => console.warn("Autoplay blocked:", error));
      };

      playAudio();
      document.addEventListener("click", playAudio, { once: true });
    }
  }, []);

  // ✅ FIXED: Generate hearts **only on the client** after the component mounts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 3}s`,
        size: `${Math.random() * 30 + 10}px`,
      }));
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  const playMusic = () => {
    const audio = document.getElementById("loveSong") as HTMLAudioElement | null;
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const changeSong = () => {
    const audio = document.getElementById("loveSong") as HTMLAudioElement | null;
    if (audio) {
      audio.pause(); // ✅ Pause the current song first
  
      const nextSongIndex = (currentSongIndex + 1) % songs.length; // 🔄 Get next song
      setCurrentSongIndex(nextSongIndex);
  
      audio.src = songs[nextSongIndex]; // ✅ Set new song source
      audio.load(); // ✅ Ensure the new audio file is loaded
  
      // ✅ Wait until the song is fully loaded, then play
      audio.onloadeddata = () => {
        audio.play();
        setIsMusicPlaying(true);
      };
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-500 to-red-700 text-white overflow-hidden">
      
      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map(({ id, left, top, duration, size }) => (
          <div
            key={id}
            className="absolute text-red-300 animate-float"
            style={{ left, top, animationDuration: duration, fontSize: size }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Title */}
      <h1 className="absolute top-6 text-2xl md:text-4xl font-bold text-center translate-y-20">
        💖 SWEET SONGS 4 U💖
      </h1>

      {/* Slideshow Container */}
      <div className="w-full flex justify-center items-center px-4">
        <img
          src={images[currentImage]}
          alt="Love Slideshow"
          className="w-full max-w-xs md:max-w-md h-auto object-cover rounded-lg shadow-2xl transition-all duration-1000 ease-in-out border-4 border-white"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-20 flex gap-4 md:gap-6">
        {/* 🎵 Pause/Play Button */}
        <button
          onClick={playMusic}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
        >
          {isMusicPlaying ? <FaPause /> : <FaMusic />} {isMusicPlaying ? "Pause" : "Play"} Music
        </button>

        {/* 🔁 Change Song Button */}
        <button
          onClick={changeSong}
          className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-3 px-6 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
        >
          <FaSync /> Change Song
        </button>
      </div>

      {/* 🎶 Hidden Audio Player */}
      <audio id="loveSong" src={songs[currentSongIndex]} autoPlay loop />

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 flex gap-6">
        {/* ⬅️ Back Button */}
        <button
          onClick={() => router.push("/")}
          className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>

        {/* ➡️ Next Button (Go to Love Letters) */}
        <button
          onClick={() => router.push("/love-letters")}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full text-sm md:text-lg shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2"
        >
          Next <FaArrowRight />
        </button>
      </div>

      {/* Floating Hearts Animation CSS */}
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
};

export default Home;
