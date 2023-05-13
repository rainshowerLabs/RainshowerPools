import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import RainshowerContract from "./RainshowerContract.json";

// Import the ethers library
import { ethers } from "ethers";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function setupEthers() {
      if (window.ethereum) {
        // Connect to an Ethereum provider
        const providerInstance = new ethers.BrowserProvider(window.ethereum);
        setProvider(providerInstance);

        // Get the signer (the user's account)
        const signerInstance = await providerInstance.getSigner();
        setSigner(signerInstance);

        // The address of your smart contract
        const contractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

        // The ABI (Application Binary Interface) of your smart contract
        const contractABI = RainshowerContract.abi;

        // Create a contract instance
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signerInstance
        );
        setContract(contractInstance);
      } else {
        console.error("Ethereum provider not found");
      }
    }

    setupEthers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Pass the contract instance to the MainContent component */}
      <MainContent contract={contract} />
    </div>
  );
}

export default App;
