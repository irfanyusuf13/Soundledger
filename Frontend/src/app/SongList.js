const SongList = ({ songs, setPlayHash }) => (
  <section className="px-4 py-6">
    <h2 className="text-xl font-semibold mb-4">📃 Your Registered Songs</h2>
    
    {songs.length === 0 ? (
      <p className="text-gray-500">No songs registered yet.</p>
    ) : (
      <div className="flex flex-col gap-4">
        {songs.map((song, idx) => (
          <div
            key={idx}
            className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm p-4"
          >
            <p className="font-semibold text-gray-800">
              🎵 {song.title} <span className="font-normal">by {song.artist}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              📁 Genre: {song.genre} | 📅 Released: {song.releaseDate}
            </p>
            <p className="text-sm text-gray-600 mt-1 break-all">
              🔗 IPFS: <code className="bg-white px-1 py-0.5 rounded">{song.ipfsHash}</code>
            </p>
            <button
              onClick={() => setPlayHash(song.ipfsHash)}
              className="mt-3 px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
            >
              ▶️ Play
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default SongList;
