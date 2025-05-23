import VerifyArtist from "../app/VerifyArtist";
import VerifySongByHash from "../app/VerifySongByHash";

export default function Verify({ contract }) {
  return (
    <div className="bg-[#1C1C22] min-h-screen pt-20">
      <div className="container mx-auto py-8">
        <div className="bg-gray-800 rounded-lg p-6 text-black space-y-6">
          <h1 className="text-3xl font-bold">Verification</h1>
          <VerifyArtist contract={contract} />
          <VerifySongByHash contract={contract} />
        </div>
      </div>
    </div>
  );
}
