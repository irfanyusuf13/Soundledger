import { Link } from "react-router-dom";
import React from "react";

const HeroSection = () => {
  return (
    <div 
      className="w-screen h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/bg.jpg')` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      <div className="relative z-10 flex flex-col justify-center items-center text-white text-center h-full max-w-4xl px-4 mx-auto">
        {/* Judul */}
        <h1 className="text-[80px] font-bold text-indigo-200 mb-4">
          <span className="block bg-gradient-to-r from-blue-600 to-blue-300 text-transparent bg-clip-text">Protect Your Music</span>
          <span className="block">Sound Ledger</span>
        </h1>
        
        {/* Deskripsi */}
        <p className="text-[30px] max-w-[800px]">
          A decentralized music platform where artists can register their songs
          and listeners can verify and play them.
        </p>

        {/* Tombol */}
        <div className="mt-8 flex gap-4">
          <Link 
            to="/register" 
            className="bg-blue-800 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Register Music
          </Link>
          <Link 
            to="/verify" 
            className="bg-transparent border border-indigo-300 hover:bg-white/10 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Verify License
          </Link>
        </div>

        {/* Footer text */}
        <p className="italic mt-8 text-sm md:text-base">
          Join us in revolutionizing the music industry!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;