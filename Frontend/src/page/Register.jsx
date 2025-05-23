import RegisterSong from "../app/RegisterSong";

export default function Register({ contract, setUserSongs }) {
  return (
    <div className="bg-[#1C1C22] min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <RegisterSong contract={contract} setUserSongs={setUserSongs} />
      </div>
    </div>
  );
}