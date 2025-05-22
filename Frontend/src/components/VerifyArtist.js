import { useState } from "react";

const VerifyArtist = ({ contract }) => {
  const [verifyHash, setVerifyHash] = useState("");
  const [artistName, setArtistName] = useState(""); // ← tambahkan ini
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
    <section>
      <h2>Verify Artist</h2>
      <input
        type="text"
        placeholder="Enter IPFS Hash"
        value={verifyHash}
        onChange={(e) => setVerifyHash(e.target.value)}
        disabled={loading}
        style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 6 }}
      />
      <button
        onClick={verifyArtist}
        disabled={loading}
        style={{
          padding: "10px 24px",
          borderRadius: 6,
          backgroundColor: "#0ea5e9",
          color: "#fff",
        }}
      >
        {loading ? "Verifying..." : "Check Artist"}
      </button>
      {artistName && (
        <p style={{ marginTop: 16, color: "#1e40af" }}>
          🎶 Artist: <strong>{artistName}</strong>
        </p>
      )}
    </section>
  );
};

export default VerifyArtist;
