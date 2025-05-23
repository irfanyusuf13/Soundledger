import React from "react";

const How = () => {
  return (
    <section className="py-24 bg-[#1C1C22]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          How It Works
        </h2>
        <p className="text-lg text-gray-400 mb-16 text-center max-w-2xl mx-auto">
          SoundLedger combines blockchain and IPFS to provide secure and transparent copyright protection
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-7xl font-bold text-indigo-900/50">1</div>
            <div className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 h-full border border-gray-700 shadow-lg">
              <h3 className="text-xl font-medium mb-3 text-white">Upload & Register</h3>
              <p className="text-gray-400">
                Upload your music and metadata to the platform. Metadata is stored on IPFS and its hash is recorded on the smart contract.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-7xl font-bold text-indigo-900/50">2</div>
            <div className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 h-full border border-gray-700 shadow-lg">
              <h3 className="text-xl font-medium mb-3 text-white">Blockchain Verification</h3>
              <p className="text-gray-400">
                The smart contract processes registration and records immutable proof of ownership on the Ethereum blockchain.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-7xl font-bold text-indigo-900/50">3</div>
            <div className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 h-full border border-gray-700 shadow-lg">
              <h3 className="text-xl font-medium mb-3 text-white">Manage Licenses & Royalties</h3>
              <p className="text-gray-400">
                Set license terms and receive royalty payments directly to your wallet through the smart contract.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default How;