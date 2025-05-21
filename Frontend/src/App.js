import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SoundLedgerABI from './abi/SoundLedger.json';

const CONTRACT_ADDRESS = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [mp3File, setMp3File] = useState(null);

  const [registeredHash, setRegisteredHash] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [verifyHash, setVerifyHash] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [userSongs, setUserSongs] = useState([]);
  const [playHash, setPlayHash] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const prov = new ethers.BrowserProvider(window.ethereum);
          const signer = await prov.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, SoundLedgerABI, signer);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          setProvider(prov);
          setSigner(signer);
          setContract(contract);
          setAccount(accounts[0]);

          window.ethereum.on("accountsChanged", () => window.location.reload());
        } catch (error) {
          alert("Gagal menginisialisasi wallet: " + error.message);
        }
      } else {
        alert("Install Metamask terlebih dahulu!");
      }
    };
    init();
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (contract && account) {
        try {
          const songs = await contract.getUserSongs(account);
          const mapped = songs.map(([title, artist, genre, releaseDate, ipfsHash]) => ({
            title, artist, genre, releaseDate, ipfsHash
          }));
          setUserSongs(mapped);
        } catch (e) {
          console.warn("Fungsi getUserSongs tidak tersedia atau gagal:", e.message);
        }
      }
    };
    fetchSongs();
  }, [contract, account]);

  const uploadMP3ToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('http://localhost:5001/api/v0/add', {
      method: 'POST',
      body: formData,
    });

    const resText = await res.text();
    const lines = resText.trim().split('\n');
    const lastLine = lines[lines.length - 1];
    const result = JSON.parse(lastLine);

    if (!result.Hash) throw new Error("Failed to upload to IPFS");
    return result.Hash;
  };

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
      setLoadingRegister(true);
      const ipfsHash = await uploadMP3ToIPFS(mp3File);

      const tx = await contract.registerSong(title, artist, genre, releaseDate, ipfsHash);
      await tx.wait();

      setRegisteredHash(ipfsHash);
      alert("Lagu berhasil diregistrasi!");

      setUserSongs(prev => [...prev, { title, artist, genre, releaseDate, ipfsHash }]);

      setTitle("");
      setArtist("");
      setGenre("");
      setReleaseDate("");
      setMp3File(null);
    } catch (err) {
      console.error(err);
      alert("Gagal registrasi lagu: " + (err?.message || err));
    } finally {
      setLoadingRegister(false);
    }
  };

  const verifyOwner = async () => {
    if (!verifyHash.trim()) {
      alert("Masukkan IPFS hash terlebih dahulu!");
      return;
    }

    try {
      setLoadingVerify(true);
      const owner = await contract.getSongOwner(verifyHash.trim());

      if (owner === "0x0000000000000000000000000000000000000000") {
        alert("Hash lagu tidak ditemukan.");
        setOwnerAddress("");
      } else {
        setOwnerAddress(owner);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal verifikasi kepemilikan: " + (err?.message || err));
      setOwnerAddress("");
    } finally {
      setLoadingVerify(false);
    }
  };

  useEffect(() => {
    setOwnerAddress("");
  }, [verifyHash]);

  return (
    <div style={{ padding: 30, fontFamily: 'Segoe UI, sans-serif', maxWidth: 800, margin: 'auto' }}>
      <h1 style={{ color: '#4f46e5' }}>🎵 Sound Ledger</h1>
      <p><strong>Connected as:</strong> <span style={{ color: '#1e3a8a' }}>{account || "Not connected"}</span></p>

      {/* Register Section */}
      <section style={{ marginTop: 30 }}>
        <h2>🎶 Register Song</h2>
        {[{ label: "Title", value: title, setter: setTitle },
          { label: "Artist", value: artist, setter: setArtist },
          { label: "Genre", value: genre, setter: setGenre }].map((field, i) => (
          <input key={i} type="text" placeholder={field.label}
            value={field.value} onChange={(e) => field.setter(e.target.value)}
            disabled={loadingRegister}
            style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6 }} />
        ))}
        <input type="date" value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          disabled={loadingRegister}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6 }} />
        <input type="file" accept=".mp3"
          onChange={(e) => setMp3File(e.target.files[0])}
          disabled={loadingRegister}
          style={{ marginBottom: 16 }} />
        <button onClick={registerSong} disabled={loadingRegister}
          style={{ padding: '10px 24px', borderRadius: 6, backgroundColor: '#4f46e5', color: '#fff', fontWeight: 'bold' }}>
          {loadingRegister ? "Registering..." : "Register"}
        </button>
        {registeredHash && (
          <p style={{ marginTop: 12, color: "green" }}>
            ✅ Registered with IPFS hash: <code>{registeredHash}</code>
          </p>
        )}
      </section>

      {/* Verify Section */}
      <section style={{ marginTop: 40 }}>
        <h2>🔍 Verify Ownership</h2>
        <input type="text" placeholder="Enter IPFS Hash"
          value={verifyHash} onChange={(e) => setVerifyHash(e.target.value)}
          disabled={loadingVerify}
          style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 6 }} />
        <button onClick={verifyOwner} disabled={loadingVerify}
          style={{ padding: '10px 24px', borderRadius: 6, backgroundColor: '#16a34a', color: '#fff', fontWeight: 'bold' }}>
          {loadingVerify ? "Verifying..." : "Check Owner"}
        </button>
        {ownerAddress && (
          <p style={{ marginTop: 16, color: '#1e40af' }}>
            🎧 Owner Address: <code>{ownerAddress}</code>
          </p>
        )}
      </section>

      {/* Play by Hash */}
      <section style={{ marginTop: 40 }}>
        <h2>🎼 Play from IPFS</h2>
        <input
          type="text"
          placeholder="Enter IPFS hash to play"
          value={playHash}
          onChange={(e) => setPlayHash(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6 }}
        />
        {playHash && (
          <audio controls src={`http://localhost:8081/ipfs/${playHash}`} style={{ width: "100%" }} />
        )}
      </section>

      {/* User Songs */}
      <section style={{ marginTop: 40 }}>
        <h2>📃 Your Registered Songs</h2>
        {userSongs.length === 0 ? (
          <p>No songs registered yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {userSongs.map((song, idx) => (
              <div key={idx} style={{
                padding: 12,
                backgroundColor: '#f3f4f6',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
              }}>
                <p><strong>🎵 {song.title}</strong> by {song.artist}</p>
                <p>📁 Genre: {song.genre} | 📅 Released: {song.releaseDate}</p>
                <p>🔗 IPFS: <code>{song.ipfsHash}</code></p>
                <button
                  onClick={() => setPlayHash(song.ipfsHash)}
                  style={{
                    marginTop: 6,
                    padding: '6px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer'
                  }}
                >
                  ▶️ Play
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
