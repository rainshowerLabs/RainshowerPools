import React, { useEffect, useState } from "react";
// import { ethers } from "ethers"; // Updated import statement
// import RainshowerPooolABI from "../abis/RainshowerPoool.json"; // Import ABI of the RainshowerPoool contract
// import erc20 from "../abis/ERC20.json"; // Import ABI of the ERC20 contract
// import pooolToken from "../abis/PooolToken.json";

// const pooolAbi = RainshowerPooolABI.abi;
// const erc20Abi = erc20.abi;
// const realPooolAbi = pooolToken.abi;

// const rainshowerPooolAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";
// const provider = new ethers.BrowserProvider(window.ethereum);
// const rainshowerPooolContract = new ethers.Contract(
//   rainshowerPooolAddress,
//   RainshowerPooolABI,
//   provider
// );

const AssetSupply = ({ assets }) => {
  return (
    <main className="container mx-auto p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wallet Balance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Supply
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Borrow Rate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{asset.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {asset.walletBalance}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{asset.totalSupply}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{asset.borrowRate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700">
                  Supply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default AssetSupply;
