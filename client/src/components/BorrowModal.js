import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ethers } from "ethers";

const rainshowerPoolAddress = "0x880876560932b9C5c07F9F2D94f84c0Cc2A6A527";

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

const BorrowModal = ({ contract }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    quoteToken: "",
    baseToken: "",
    oracleAddress: "",
    poolFee: "",
    pricePeriod: "",
    maintenanceMargin: "",
    swapRouterAddress: "",
    pool: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const abi = ethers.utils.defaultAbiCoder;
    const data = abi.encode(
      [
        `tuple(address quoteToken, uint128 quoteAmount, address baseToken, address oracleAddress,
                         uint24 poolFee, uint32 period, uint80 maintanenceMargin,
                         address swapRouterAddress, address pool)`,
      ],
      formData
    );

    // Encode the data here
    const borrowData = data;
    await contract.methods.getQuote(rainshowerPoolAddress, borrowData).send();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Borrow</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Quote Token"
              name="quoteToken"
              value={formData.quoteToken}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Base Token"
              name="baseToken"
              value={formData.baseToken}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Oracle Address"
              name="oracleAddress"
              value={formData.oracleAddress}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Pool Fee"
              name="poolFee"
              value={formData.poolFee}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price Period"
              name="pricePeriod"
              value={formData.pricePeriod}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Maintenance Margin"
              name="maintenanceMargin"
              value={formData.maintenanceMargin}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Swap Router Address"
              name="swapRouterAddress"
              value={formData.swapRouterAddress}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Pool"
              name="pool"
              value={formData.pool}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" fullWidth variant="contained">
              Borrow
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default BorrowModal;
