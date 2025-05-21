const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoundLedger", function () {
  it("Should register a song and return the correct owner", async function () {
    const [owner] = await ethers.getSigners();

    const SoundLedger = await ethers.getContractFactory("SoundLedger");
    const soundLedger = await SoundLedger.deploy();
    await soundLedger.waitForDeployment(); // ✅ Gantikan `.deployed()` dengan ini jika Hardhat 2.21+

    const ipfsHash = "QmABC123";
    const title = "Lagu Keren";

    await soundLedger.registerSong(title, ipfsHash);

    const ownerFromContract = await soundLedger.getSongOwner(ipfsHash);
    expect(ownerFromContract).to.equal(owner.address);
  });
});
