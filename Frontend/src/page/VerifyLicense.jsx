import VerifyArtist from "../app/VerifyArtist";
import VerifySongByHash from "../app/VerifySongByHash";

export default function Verify({ contract }) {
  return (
    <div className="bg-[#1C1C22] min-h-screen pt-20">
      <div className="container mx-auto py-8">
        <div className="rounded-lg text-center p-6 text-white space-y-6">
          <h1 className="text-[40px] font-bold">License Verification</h1>
          <p className="text-gray-200 text-[20px] pb-10">
            Verify the authenticity and validity of a music license using a license ID or blockchain transaction hash.</p>
          <VerifyArtist contract={contract} />
          <VerifySongByHash contract={contract} />
        </div>
      </div>
    </div>
  );
}
