import { useState } from "react";

const VerifySongByHash = ({ contract }) => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSongMetadata = async () => {
    if (!ipfsHash.trim()) {
      alert("Masukkan IPFS hash terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      const [title, artist, genre, releaseDate] = await contract.getSongMetadata(ipfsHash.trim());

      if (!title) {
        alert("Lagu tidak ditemukan untuk hash tersebut.");
        setSongData(null);
        return;
      }

      setSongData({ title, artist, genre, releaseDate });
    } catch (error) {
      console.error("Error fetching song metadata:", error);
      alert("Gagal mengambil data lagu: " + (error?.message || error));
      setSongData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">🔍 Cari Lagu Berdasarkan IPFS Hash</h2>

      <input
        type="text"
        placeholder="Masukkan IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
        disabled={loading}
        className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      />

      <button
        onClick={fetchSongMetadata}
        disabled={loading}
        className="px-6 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition disabled:opacity-50"
      >
        {loading ? "Memuat..." : "Cari Lagu"}
      </button>

      {songData && (
        <div className="mt-6 bg-blue-50 border border-blue-300 rounded-lg p-4 text-blue-900">
          <p>🎵 <strong>Judul:</strong> {songData.title}</p>
          <p>🎤 <strong>Artis:</strong> {songData.artist}</p>
          <p>🎼 <strong>Genre:</strong> {songData.genre}</p>
          <p>📅 <strong>Tanggal Rilis:</strong> {songData.releaseDate}</p>
        </div>
      )}
    </section>
  );
};

export default VerifySongByHash;
