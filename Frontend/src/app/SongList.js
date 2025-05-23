
const SongList = ({ songs, setPlayHash }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
      Your Registered Songs
    </h2>
    
    {songs.length === 0 ? (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-500 mb-4">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <p className="text-gray-400">No songs registered yet</p>
        <p className="text-sm text-gray-500 mt-2">Register your first song to see it appear here</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-4">
        {songs.map((song, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">by {song.artist}</p>
              </div>
              <span className="bg-indigo-900/30 text-indigo-400 text-xs px-2 py-1 rounded">
                Registered
              </span>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Genre</p>
                <p className="text-gray-300">{song.genre}</p>
              </div>
              <div>
                <p className="text-gray-500">Released</p>
                <p className="text-gray-300">{song.releaseDate}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-500 text-sm mb-1">IPFS Hash</p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono bg-gray-900 text-gray-300 px-2 py-1 rounded truncate flex-1">
                  {song.ipfsHash}
                </code>
                <button
                  onClick={() => setPlayHash(song.ipfsHash)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Play
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default SongList;
