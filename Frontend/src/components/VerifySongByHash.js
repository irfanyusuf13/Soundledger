import { useState } from "react";

const VerifySongByHash = ({ contract }) => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [songData, setSongData] = useState(null); // { title, artist, genre, releaseDate }
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
    <section>
      <h2>Cari Lagu Berdasarkan IPFS Hash</h2>
      <input
        type="text"
        placeholder="Masukkan IPFS Hash"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
        disabled={loading}
        style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 6 }}
      />
      <button
        onClick={fetchSongMetadata}
        disabled={loading}
        style={{
          padding: "10px 24px",
          borderRadius: 6,
          backgroundColor: "#0ea5e9",
          color: "#fff",
        }}
      >
        {loading ? "Memuat..." : "Cari Lagu"}
      </button>

      {songData && (
        <div style={{ marginTop: 16, color: "#1e40af" }}>
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
