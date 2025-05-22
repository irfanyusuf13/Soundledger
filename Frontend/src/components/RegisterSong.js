import { useState } from "react";
import { uploadMP3ToIPFS } from "../utils/ipfs";

const RegisterSong = ({ contract, setUserSongs }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [mp3File, setMp3File] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registeredHash, setRegisteredHash] = useState("");

  const registerSong = async () => {
    if (!title || !artist || !genre || !releaseDate || !mp3File) {
      alert("Lengkapi semua field dan upload file MP3!");
      return;
    }
    if (!mp3File.name.toLowerCase().endsWith(".mp3")) {
      alert("File harus berekstensi .mp3");
      return;
    }

    try {
      setLoading(true);
      const ipfsHash = await uploadMP3ToIPFS(mp3File);
      const tx = await contract.registerSong(title, artist, genre, releaseDate, ipfsHash);
      await tx.wait();

      setRegisteredHash(ipfsHash);
      setUserSongs(prev => [...prev, { title, artist, genre, releaseDate, ipfsHash }]);
      alert("Lagu berhasil diregistrasi!");

      setTitle(""); setArtist(""); setGenre(""); setReleaseDate(""); setMp3File(null);
    } catch (err) {
      alert("Gagal registrasi lagu: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🎶 Register Song</h2>
      
      <div className="space-y-4">
        {[{ label: "Title", val: title, set: setTitle },
          { label: "Artist", val: artist, set: setArtist },
          { label: "Genre", val: genre, set: setGenre }].map((f, i) => (
          <input 
            key={i} 
            placeholder={f.label} 
            value={f.val}
            onChange={(e) => f.set(e.target.value)} 
            disabled={loading}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-500"
          />
        ))}
        
        <input 
          type="date" 
          value={releaseDate} 
          onChange={e => setReleaseDate(e.target.value)}
          disabled={loading} 
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-500"
        />
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
          <input 
            type="file" 
            accept=".mp3" 
            onChange={(e) => setMp3File(e.target.files[0])}
            disabled={loading} 
            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
          />
          <p className="text-sm text-gray-500 mt-2">📁 Choose MP3 file to upload</p>
        </div>
        
        <button 
          onClick={registerSong} 
          disabled={loading}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:cursor-not-allowed"
        >
          {loading ? "🔄 Registering..." : "📝 Register Song"}
        </button>
        
        {registeredHash && (
          <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ Successfully registered! 
            </p>
            <p className="text-sm text-green-700 mt-1">
              🔗 IPFS Hash: <code className="bg-green-100 px-2 py-1 rounded text-xs">{registeredHash}</code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RegisterSong;