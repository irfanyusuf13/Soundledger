import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Register from "./page/Register";
import Verify from "./page/VerifyLicense";
import "./App.css";

export default function AppRoutes({ contract, account }) {
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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            songs={userSongs}
            playHash={playHash}
            setPlayHash={setPlayHash}
          />
        }
      />
      <Route
        path="/register"
        element={<Register contract={contract} setUserSongs={setUserSongs} />}
      />
      <Route path="/verify" element={<Verify contract={contract} />} />
    </Routes>
  );
}
