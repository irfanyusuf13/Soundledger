import { useState } from "react";

const VerifyArtist = ({ contract }) => {
  const [verifyHash, setVerifyHash] = useState("");
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyArtist = async () => {
    if (!verifyHash.trim()) {
      alert("Masukkan IPFS hash terlebih dahulu!");
      return;
    }

    try {
      setLoading(true);
      console.log("Verifying artist for hash:", verifyHash.trim());
      const owner = await contract.getSongOwner(verifyHash.trim());

      if (owner === "0x0000000000000000000000000000000000000000") {
        alert("Owner tidak ditemukan untuk hash tersebut.");
        setArtistName("");
        return;
      }

      setArtistName(owner);
    } catch (err) {
      console.error("Error verifying artist:", err);
      alert("Gagal verifikasi artis: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">🎤 Verify Artist</h2>

      <input
        type="text"
        placeholder="Enter IPFS Hash"
        value={verifyHash}
        onChange={(e) => setVerifyHash(e.target.value)}
        disabled={loading}
        className="w-full p-3 mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      />

      <button
        onClick={verifyArtist}
        disabled={loading}
        className="px-6 py-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Check Artist"}
      </button>

      {artistName && (
        <p className="mt-4 text-blue-800">
          🎶 Artist: <strong>{artistName}</strong>
        </p>
      )}
    </section>
  );
};

export default VerifyArtist;
