import { useState } from "react";
import { Music, FileText, Clock } from "lucide-react";
import SongList from "../app/SongList";
import PlayByHash from "../app/PlayByHash";

export default function Dashboard({ songs, playHash, setPlayHash }) {
  const [activeTab, setActiveTab] = useState("songs");
  // Calculate total earnings (mock data)
  const totalEarnings = songs.reduce((sum, song) => sum + (song.royalty || 0), 0);

  return (
    <div className="bg-[#1C1C22] min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Artist Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <Music className="h-8 w-8 text-indigo-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Registered Songs</p>
                <p className="text-2xl font-bold text-white">{songs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">License Transactions</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-cyan-400 mr-3" />
              <div>
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-white">{totalEarnings} ETH</p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="mb-6 flex border-b border-gray-700">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "songs" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400"}`}
            onClick={() => setActiveTab("songs")}
          >
            My Songs
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "play" ? "text-indigo-400 border-b-2 border-indigo-400" : "text-gray-400"}`}
            onClick={() => setActiveTab("play")}
          >
            Play Music
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "songs" && <SongList songs={songs} setPlayHash={setPlayHash} />}
          {activeTab === "play" && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <PlayByHash playHash={playHash} setPlayHash={setPlayHash} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}