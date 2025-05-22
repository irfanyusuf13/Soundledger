import { useState, useEffect } from "react";
import { useSoundLedger } from "./hooks/useSoundLedger";
import HeroSection from "./components/HeroSection";
import RegisterSong from "./components/RegisterSong";
import VerifyArtist from "./components/VerifyArtist";
import PlayByHash from "./components/PlayByHash";
import SongList from "./components/SongList";
import VerifySongByHash from "./components/VerifySongByHash";
import "./App.css";


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
              const [title, artist, genre, releaseDate] =
                await contract.getSongMetadata(hash);
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
    <div className="App">
      <HeroSection />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Sound Ledger</h1>
            <p className="text-gray-700 mb-4">
              A decentralized music platform where artists can register their
              songs and listeners can verify and play them.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <RegisterSong contract={contract} setUserSongs={setUserSongs} />
              <VerifyArtist contract={contract} />
              <VerifySongByHash contract={contract} />
              <PlayByHash playHash={playHash} setPlayHash={setPlayHash} />
              <SongList songs={userSongs} setPlayHash={setPlayHash} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
