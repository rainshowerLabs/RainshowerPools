import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ethers } from "ethers";
import erc20 from "../abis/ERC20.json";
import rainshowerPoolAbi from "../abis/RainshowerPoool.json";

const rainshowerPoolAddress = "0x880876560932b9C5c07F9F2D94f84c0Cc2A6A527";
const factoryAddress = "0x617c42dB45b8D1F2cE4Ec29156de8BBbb5e41F6b";
const riskAddress = "0x121aBAD6Cad5c8584847419224464F9cd70E4e45";
const fWETH = "0x666E4018aD77127E3273bA391C60a60AD7244451";
const fUSDC = "0x617c42dB45b8D1F2cE4Ec29156de8BBbb5e41F6b";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SupplyModal = ({ contract }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
    amount: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the provider
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Get fWETH contract with erc20 abi
    const token = contract;
    const signer = await provider.getSigner();
    const tokenWithSigner = token.connect(signer);

    // Deploy RainshowerPoool contract
    const Poool = new ethers.ContractFactory(
      rainshowerPoolAbi.abi,
      rainshowerPoolAbi.bytecode,
      signer
    );
    const deployTx = await Poool.deploy(riskAddress, factoryAddress);
    const deployReceipt = await deployTx.wait(); // Wait for the deployment transaction to be confirmed
    const poool = new ethers.Contract(
      deployReceipt.contractAddress,
      rainshowerPoolAbi.abi,
      signer
    );

    // Approve the poool to spend the tokens
    await tokenWithSigner.approve(
      poool.address,
      ethers.utils.parseUnits("10000", 18)
    );
    // Deposit fWETH into poool
    await poool.deposit(
      formData.token,
      ethers.utils.parseUnits(formData.amount, 18)
    );

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Supply</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Token"
              name="token"
              value={formData.token}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" fullWidth variant="contained">
              Supply
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SupplyModal;
