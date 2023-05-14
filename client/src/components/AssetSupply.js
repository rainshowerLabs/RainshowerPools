import React, { useEffect, useState } from "react";
import { ethers, formatUnits } from "ethers";
import erc20 from "../abis/ERC20.json";
import SupplyModal from "./SupplyModal";
import RainshowerPoool from "../abis/RainshowerPoool.json";

const WETHContractAddress = "0x666E4018aD77127E3273bA391C60a60AD7244451";
const provider = new ethers.BrowserProvider(window.ethereum);
const WETHContract = new ethers.Contract(
  WETHContractAddress,
  erc20.abi,
  provider
);

const USDCContractAddress = "0x5345ed0c3D495077A47Bb06b9E61983C4949cC1D";
const USDCContract = new ethers.Contract(
  USDCContractAddress,
  erc20.abi,
  provider
);

const AssetSupply = ({ assets, contract }) => {
  const [WETHBalance, setWETHBalance] = useState(0);
  const [USDCBalance, setUSDCBalance] = useState(0);
  const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false);

  useEffect(() => {
    const fetchWETHBalance = async () => {
      try {
        const [userAccount] = await provider.send("eth_requestAccounts");
        const balance = await WETHContract.balanceOf(userAccount);
        const balanceInEther = parseFloat(balance.toString()).toFixed(2);
        setWETHBalance(balanceInEther);
      } catch (error) {
        console.error("Error fetching WETH balance:", error);
      }
    };

    const fetchUSDCBalance = async () => {
      try {
        const [userAccount] = await provider.send("eth_requestAccounts");
        const balance = await USDCContract.balanceOf(userAccount);
        const balanceInUSDC = parseFloat(formatUnits(balance, 6)).toFixed(2); // USDC has 6 decimal places
        setUSDCBalance(balanceInUSDC);
      } catch (error) {
        console.error("Error fetching USDC balance:", error);
      }
    };

    fetchWETHBalance();
    fetchUSDCBalance();
  }, []);

  const handleClose = () => {
    setIsSupplyModalOpen(false);
  };

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
                  {asset.id === 1
                    ? WETHBalance.toString()
                    : asset.id === 2
                    ? USDCBalance.toString()
                    : asset.walletBalance}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{asset.totalSupply}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{asset.borrowRate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <SupplyModal
                  open={isSupplyModalOpen}
                  onClose={handleClose}
                  contract={contract}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default AssetSupply;
