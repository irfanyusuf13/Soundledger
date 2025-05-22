export default function HeroSection() {
  return (
    <div className="w-screen h-screen bg-blue-600 relative">
      {/* Overlay gelap transparan */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      {/* Konten */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white text-center h-full max-w-4xl px-4 mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-indigo-200">
          Welcome to Sound Ledger
        </h1>
        <p className="text-sm md:text-base mt-4">
          A decentralized music platform where artists can register their songs
          and listeners can verify and play them.
        </p>

        <div className="mt-6 text-left">
          <p className="font-semibold text-lg">Features:</p>
          <ul className="list-disc list-inside mt-2 text-sm md:text-base">
            <li>Register your songs on the blockchain</li>
            <li>Verify the authenticity of songs</li>
            <li>Play songs directly from IPFS</li>
          </ul>
        </div>

        <p className="italic mt-6 text-sm md:text-base">
          Join us in revolutionizing the music industry!
        </p>
      </div>
    </div>
  );
}