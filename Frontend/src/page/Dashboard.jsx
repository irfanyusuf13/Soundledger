import SongList from "../app/SongList";
import PlayByHash from "../app/PlayByHash";

export default function Dashboard({ songs, playHash, setPlayHash }) {
  return (
    <div className="bg-[#1C1C22] min-h-screen pt-20">
      <div className="container mx-auto py-8">
        <div className="bg-gray-800 rounded-lg p-6 text-black">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          <PlayByHash playHash={playHash} setPlayHash={setPlayHash} />
          <SongList songs={songs} setPlayHash={setPlayHash} />
        </div>
      </div>
    </div>
  );
}
