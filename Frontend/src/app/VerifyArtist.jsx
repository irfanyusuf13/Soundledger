import { useState } from "react";
import { Mic2, Search, AlertCircle } from "lucide-react";

const VerifyArtist = ({ contract }) => {
  const [verifyHash, setVerifyHash] = useState("");
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verifyArtist = async () => {
    if (!verifyHash.trim()) {
      setError("Please enter an IPFS hash");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const owner = await contract.getSongOwner(verifyHash.trim());

      if (owner === "0x0000000000000000000000000000000000000000") {
        setError("No artist found for this hash");
        setArtistName("");
        return;
      }

      setArtistName(owner);
    } catch (err) {
      console.error("Error verifying artist:", err);
      setError("Failed to verify artist: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
        <Mic2 size={20} />
        Verify Artist
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter IPFS Hash"
            value={verifyHash}
            onChange={(e) => {
              setVerifyHash(e.target.value);
              setError("");
            }}
            disabled={loading}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 pl-10"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>

        <button
          onClick={verifyArtist}
          disabled={loading}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            <>
              <Search size={18} />
              Check Artist
            </>
          )}
        </button>

        {error && (
          <div className="mt-2 p-3 bg-red-900/20 border border-red-700 rounded-lg flex items-start gap-2 text-red-400">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {artistName && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
            <div className="flex items-center gap-2 text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="font-medium">Artist Found</span>
            </div>
            <div className="mt-2 text-sm text-green-300">
              <p>Artist Address:</p>
              <code className="block bg-green-900/30 px-2 py-1 rounded text-xs mt-1 overflow-x-auto">
                {artistName}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyArtist;