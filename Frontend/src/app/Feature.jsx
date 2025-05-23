import { Music, Shield, FileText, Key } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Music className="h-10 w-10 text-blue-400" />,
      title: "Music Registration",
      description: "Register your music on the blockchain for immutable proof of ownership."
    },
    {
      icon: <FileText className="h-10 w-10 text-blue-500" />,
      title: "IPFS Metadata",
      description: "Store all song metadata on IPFS for decentralized and permanent storage."
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: "Plagiarism Detection",
      description: "Verify authenticity and detect plagiarism using hash-based protection."
    },
    {
      icon: <Key className="h-10 w-10 text-blue-400" />,
      title: "Automatic Licensing",
      description: "Smart contract licensing system with direct royalty payments to your wallet."
    }
  ];

  return (
    <section className="py-24 bg-[#1C1C22]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
          Key Features
        </h2>
        <p className="text-lg text-gray-300 mb-16 text-center max-w-2xl mx-auto">
          A blockchain-based platform providing decentralized music copyright protection and management
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#252530] rounded-xl p-6 text-center hover:bg-[#2E2E3A] transition-all duration-300 border border-[#3B3B4D]"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;