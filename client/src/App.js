import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

// Import the ethers library
// const { ethers } = window;

// Connect to an Ethereum provider
// const provider = new ethers.providers.Web3Provider(window.ethereum);

// Get the signer (the user's account)
// const signer = provider.getSigner();

// The address of your smart contract
// const contractAddress = '0x...';

// The ABI (Application Binary Interface) of your smart contract
// const contractABI = [...];

// Create a contract instance
// const contract = new ethers.Contract(contractAddress, contractABI, signer);

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <MainContent />
    </div>
  );
}

export default App;
