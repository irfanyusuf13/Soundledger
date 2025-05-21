import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SoundLedgerABI from "../abi/SoundLedger.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


export const useSoundLedger = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  console.log("Current account:", account);
  console.log("Current contract:", contract?.address);


  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const prov = new ethers.BrowserProvider(window.ethereum);
          const signer = await prov.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, SoundLedgerABI, signer);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          setProvider(prov);
          setSigner(signer);
          setContract(contract);
          setAccount(accounts[0]);

          window.ethereum.on("accountsChanged", () => window.location.reload());
        } catch (error) {
          alert("Gagal menginisialisasi wallet: " + error.message);
        }
      } else {
        alert("Install Metamask terlebih dahulu!");
      }
    };
    init();
  }, []);

  return { provider, signer, contract, account };
};
