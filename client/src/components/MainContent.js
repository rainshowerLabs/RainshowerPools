import React from "react";
import AssetSupply from "./AssetSupply";
import AssetBorrow from "./AssetBorrow";

const assets = [
  {
    id: 1,
    name: "USDC",
    walletBalance: 500,
    totalSupply: 1000,
    borrowRate: "5%",
    available: 15000,
    apyStable: "3.8%",
    apyVariable: "-",
  },
  {
    id: 2,
    name: "WETH",
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
        <AssetSupply assets={assets} />
        <AssetBorrow assets={assets} />
      </div>
    </main>
  );
};

export default MainContent;
