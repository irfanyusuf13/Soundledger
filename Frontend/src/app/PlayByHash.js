const PlayByHash = ({ playHash, setPlayHash }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      Play from IPFS
    </h2>

    <div className="relative">
      <input
        type="text"
        placeholder="Enter IPFS hash to play"
        value={playHash}
        onChange={(e) => setPlayHash(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute right-3 top-3 text-gray-400"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>

    {playHash && (
      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <audio
          controls
          src={`http://localhost:8081/ipfs/${playHash}`}
          className="w-full rounded-lg"
        />
        <div className="mt-2 flex justify-between items-center text-sm text-gray-400">
          <span>Now playing</span>
          <span className="font-mono text-xs bg-gray-900 px-2 py-1 rounded">
            {playHash.substring(0, 12)}...
            {playHash.substring(playHash.length - 4)}
          </span>
        </div>
      </div>
    )}
  </div>
);

export default PlayByHash;
