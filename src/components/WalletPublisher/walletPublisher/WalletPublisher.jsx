import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import WalletPublisherTable from "./WalletPublisherTable";
import WalletPublisherTableVertical from "./WalletPublisherVertical";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function WalletPublisher() {
  const init = {
    paymentMethod: "bt",
    amount: "",
  };
  const [input, setInput] = useState(init);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  };
  // console.log(input);
  return (
    <div style={{ marginTop: "20px" }}>
      {/* <Grid sx={{width:"90%",margin:"auto"}} container spacing={2}> */}
      {/* <Grid sx={{display:"flex",justifyContent:"space-between"}} item xs={12} md={12}> */}

      <div
        style={{
          padding: "15px",
          width: "93%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          background: "#F9F9F9",
        }}
      >
        <Typography fontWeight="bold">Current Wallet Balance : $50</Typography>
        <p>Pending withdrawal : $20</p>
      </div>
      <Divider
        variant="middle"
        sx={{
          width: "93%",
          margin: "auto",
          height: "0.3em",
          background: "black",
          marginBottom: "54px",
        }}
      />

      <div className=" md:flex lg:flex">
        <div className="md:w-1/3 md:mx-10 sm:w-full">
          <Grid
            sx={{
              width: "90%",
              margin: "auto",
              background: "#F9F9F9",
              padding: "2em",
            }}
            container
            spacing={2}
          >
            <Grid item xs={12} md={12}>
              <p style={{ fontWeight: 600, fontSize: "18px" }}>
                Withdraw Funds
              </p>

              <p
                style={{
                  marginBottom: "2em",
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                Please enter the amount
              </p>

              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                name="amount"
                value={input.amount}
                onChange={handleChange}
                label="Enter Withdrawal Amount"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <p
                style={{
                  marginBottom: "2em",
                  marginTop: "2em",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Choose your payment method
              </p>
              <Box sx={{ marginTop: "1em" }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Choose your payment method
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={input?.paymentMethod}
                    name="paymentMethod"
                    label="Choose your payment method"
                    onChange={handleChange}
                  >
                    <MenuItem value={"bt"}>Bank Transfer</MenuItem>
                    <MenuItem value={"crypto"}>Cryptocurrency</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <div className="p-5">
              <Button
                type="submit"
                sx={{ marginTop: "2em", background: "black" }}
                variant="contained"
              >
                Proceed
                <span>
                  <ArrowForwardIcon />
                </span>
              </Button>
            </div>
          </Grid>
        </div>

        <div className="p-5 w-full place-content-center hidden md:block">
          <div style={{ background: "#F9F9F9", padding: "2em" }}>
            <Typography variant="h6" fontWeight="bold" marginBottom="3em">
              Wallet History
            </Typography>
            <WalletPublisherTable />
          </div>
        </div>
        <div className=" place-content-center md:hidden ">
          <div style={{ background: "#F9F9F9", padding: "2em" }}>
            <Typography variant="h6" fontWeight="bold" marginBottom="3em">
              Wallet History
            </Typography>
            <WalletPublisherTableVertical />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPublisher;
