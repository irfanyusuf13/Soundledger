const hre = require("hardhat");

async function main() {
  const SoundLedger = await hre.ethers.getContractFactory("SoundLedger");
  const soundLedger = await SoundLedger.deploy();

 await soundLedger.waitForDeployment();

  console.log(`SoundLedger deployed to: ${soundLedger.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
