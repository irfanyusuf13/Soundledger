import { useState } from "react";
import { Music, Upload, Calendar, Disc, Mic2, FileAudio } from "lucide-react";
import { uploadMP3ToIPFS } from "../utils/ipfs";

const RegisterSong = ({ contract, setUserSongs }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseDate: "",
    mp3File: null
  });
  const [loading, setLoading] = useState(false);
  const [registeredHash, setRegisteredHash] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, mp3File: e.target.files[0] }));
  };

  const registerSong = async () => {
    const { title, artist, genre, releaseDate, mp3File } = formData;
    
    if (!title || !artist || !genre || !releaseDate || !mp3File) {
      alert("Please fill all fields and upload an MP3 file!");
      return;
    }
    if (!mp3File.name.toLowerCase().endsWith(".mp3")) {
      alert("File must be an MP3");
      return;
    }

    try {
      setLoading(true);
      const ipfsHash = await uploadMP3ToIPFS(mp3File);
      const tx = await contract.registerSong(title, artist, genre, releaseDate, ipfsHash);
      await tx.wait();

      setRegisteredHash(ipfsHash);
      setUserSongs(prev => [...prev, { title, artist, genre, releaseDate, ipfsHash }]);
      
      // Reset form
      setFormData({
        title: "",
        artist: "",
        genre: "",
        releaseDate: "",
        mp3File: null
      });
    } catch (err) {
      alert("Registration failed: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white flex items-center gap-3">
        <Music className="text-indigo-400" size={32} />
        Register New Song
      </h1>
      <p className="text-gray-400 mb-8">
        Protect your music by registering it on the blockchain
      </p>

      <div className="space-y-6">
        {/* Song Title */}
        <div className="space-y-2">
          <label className="text-gray-300 flex items-center gap-2">
            <Disc size={18} />
            Song Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter song title"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Artist */}
        <div className="space-y-2">
          <label className="text-gray-300 flex items-center gap-2">
            <Mic2 size={18} />
            Artist Name
          </label>
          <input
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter artist name"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Genre */}
        <div className="space-y-2">
          <label className="text-gray-300 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
              <path d="M8.5 8.5v.01"></path>
              <path d="M16 15.5v.01"></path>
              <path d="M12 12v.01"></path>
              <path d="M11 17v.01"></path>
              <path d="M7 14v.01"></path>
            </svg>
            Genre
          </label>
          <input
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter genre"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Release Date */}
        <div className="space-y-2">
          <label className="text-gray-300 flex items-center gap-2">
            <Calendar size={18} />
            Release Date
          </label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            disabled={loading}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* MP3 Upload */}
        <div className="space-y-2">
          <label className="text-gray-300 flex items-center gap-2">
            <FileAudio size={18} />
            MP3 File
          </label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-indigo-500 transition-colors">
            <label className="cursor-pointer flex flex-col items-center">
              <Upload size={24} className="text-gray-400 mb-2" />
              <span className="text-gray-400 text-sm">
                {formData.mp3File ? formData.mp3File.name : "Click to upload MP3 file"}
              </span>
              <input
                type="file"
                accept=".mp3"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={registerSong}
          disabled={loading}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registering...
            </>
          ) : (
            <>
              <Music size={18} />
              Register Song
            </>
          )}
        </button>

        {/* Success Message */}
        {registeredHash && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <div className="flex items-center gap-2 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="font-medium">Successfully registered!</span>
            </div>
            <div className="mt-2 text-sm text-green-300">
              <p>IPFS Hash:</p>
              <code className="block bg-green-900/30 px-2 py-1 rounded text-xs mt-1 overflow-x-auto">
                {registeredHash}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterSong;