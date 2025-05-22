const SongList = ({ songs, setPlayHash }) => (
  <section>
    <h2>📃 Your Registered Songs</h2>
    {songs.length === 0 ? (
      <p>No songs registered yet.</p>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {songs.map((song, idx) => (
          <div key={idx} style={{
            padding: 12,
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
          }}>
            <p><strong> {song.title}</strong> by {song.artist}</p>
            <p> Genre: {song.genre} |  Released: {song.releaseDate}</p>
            <p> IPFS: <code>{song.ipfsHash}</code></p>
            <button onClick={() => setPlayHash(song.ipfsHash)}
              style={{ marginTop: 6, padding: '6px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: 6 }}>
              ▶️ Play
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default SongList;
