import { useState, useEffect } from "react";
import { useSoundLedger } from "./hooks/useSoundLedger";
import RegisterSong from "./components/RegisterSong";
import VerifyArtist from "./components/VerifyArtist";
import PlayByHash from "./components/PlayByHash";
import SongList from "./components/SongList";
import VerifySongByHash from "./components/VerifySongByHash";


function App() {
  const { contract, account } = useSoundLedger();
  const [userSongs, setUserSongs] = useState([]);
  const [playHash, setPlayHash] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      if (contract && account) {
        try {
          const hashes = await contract.getSongsByArtist(account);
          const songs = await Promise.all(
            hashes.map(async (hash) => {
              const [title, artist, genre, releaseDate] = await contract.getSongMetadata(hash);
              return { title, artist, genre, releaseDate, ipfsHash: hash };
            })
          );
          setUserSongs(songs);
        } catch (e) {
          console.warn("Gagal mengambil lagu:", e.message);
        }
      }
    };
    fetchSongs();
  }, [contract, account]);

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: 'auto' }}>
      <h1 style={{ color: '#4f46e5' }}>🎵 Sound Ledger</h1>
      <p><strong>Connected as:</strong> <span style={{ color: '#1e3a8a' }}>{account || "Not connected"}</span></p>
      <RegisterSong contract={contract} setUserSongs={setUserSongs} />
      <VerifyArtist contract={contract} />
      <VerifySongByHash contract={contract} />
      <PlayByHash playHash={playHash} setPlayHash={setPlayHash} />
      <SongList songs={userSongs} setPlayHash={setPlayHash} />
    </div>
  );
}

export default App;
