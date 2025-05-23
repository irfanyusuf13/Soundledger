import { useState } from "react";
import { Music, Search, Disc, Mic2, Calendar } from "lucide-react";

const VerifySongByHash = ({ contract }) => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSongMetadata = async () => {
    if (!ipfsHash.trim()) {
      setError("Please enter an IPFS hash");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const [title, artist, genre, releaseDate] = await contract.getSongMetadata(ipfsHash.trim());

      if (!title) {
        setError("No song found for this hash");
        setSongData(null);
        return;
      }

      setSongData({ title, artist, genre, releaseDate });
    } catch (error) {
      console.error("Error fetching song metadata:", error);
      setError("Failed to fetch song: " + (error?.message || error));
      setSongData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
        <Music size={20} />
        Verify Song by Hash
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter IPFS Hash"
            value={ipfsHash}
            onChange={(e) => {
              setIpfsHash(e.target.value);
              setError("");
            }}
            disabled={loading}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 pl-10"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>

        <button
          onClick={fetchSongMetadata}
          disabled={loading}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            <>
              <Search size={18} />
              Find Song
            </>
          )}
        </button>

        {error && (
          <div className="mt-2 p-3 bg-red-900/20 border border-red-700 rounded-lg flex items-start gap-2 text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {songData && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="font-medium">Song Verified</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <Disc size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-500">Title</p>
                  <p className="text-green-300">{songData.title}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mic2 size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-500">Artist</p>
                  <p className="text-green-300">{songData.artist}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 mt-0.5 flex-shrink-0">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 15.5v.01"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M11 17v.01"></path>
                  <path d="M7 14v.01"></path>
                </svg>
                <div>
                  <p className="text-green-500">Genre</p>
                  <p className="text-green-300">{songData.genre}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-500">Release Date</p>
                  <p className="text-green-300">{songData.releaseDate}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifySongByHash;