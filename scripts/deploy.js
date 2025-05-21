const hre = require("hardhat");

async function main() {
  const SoundLedger = await hre.ethers.getContractFactory("SoundLedger");
  const soundLedger = await SoundLedger.deploy();

  console.log("SoundLedger deployed to:", soundLedger.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
