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
    <section>
      <h2>🎶 Register Song</h2>
      {[{ label: "Title", val: title, set: setTitle },
        { label: "Artist", val: artist, set: setArtist },
        { label: "Genre", val: genre, set: setGenre }].map((f, i) => (
        <input key={i} placeholder={f.label} value={f.val}
          onChange={(e) => f.set(e.target.value)} disabled={loading}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6 }} />
      ))}
      <input type="date" value={releaseDate} onChange={e => setReleaseDate(e.target.value)}
        disabled={loading} style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6 }} />
      <input type="file" accept=".mp3" onChange={(e) => setMp3File(e.target.files[0])}
        disabled={loading} style={{ marginBottom: 16 }} />
      <button onClick={registerSong} disabled={loading}
        style={{ padding: '10px 24px', borderRadius: 6, backgroundColor: '#4f46e5', color: '#fff', fontWeight: 'bold' }}>
        {loading ? "Registering..." : "Register"}
      </button>
      {registeredHash && <p style={{ marginTop: 12, color: "green" }}>✅ IPFS: <code>{registeredHash}</code></p>}
    </section>
  );
};

export default RegisterSong;
