import React from "react";
import AssetSupply from "./AssetSupply";
import AssetBorrow from "./AssetBorrow";
import { ethers } from "ethers";
import erc20 from "../abis/ERC20.json";

const WETHContractAddress = "0x666E4018aD77127E3273bA391C60a60AD7244451";
const provider = new ethers.BrowserProvider(window.ethereum);
const WETHContract = new ethers.Contract(
  WETHContractAddress,
  erc20.abi,
  provider
);

const assets = [
  {
    id: 1,
    name: "WETH",
    address: "0x666E4018aD77127E3273bA391C60a60AD7244451",
    walletBalance: 500,
    totalSupply: 1000,
    borrowRate: "5%",
    available: 15000,
    apyStable: "3.8%",
    apyVariable: "-",
  },
  {
    id: 2,
    name: "USDC",
    address: "0x5345ed0c3D495077A47Bb06b9E61983C4949cC1D",
    walletBalance: 800,
    totalSupply: 2000,
    borrowRate: "4%",
    available: 5000,
    apyStable: "3.23%",
    apyVariable: "-",
  },
];

const MainContent = () => {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Ethereum Market</h2>
      <div className="flex">
        <AssetSupply assets={assets} contract={WETHContract} />
        <AssetBorrow assets={assets} />
      </div>
    </main>
  );
};

export default MainContent;
