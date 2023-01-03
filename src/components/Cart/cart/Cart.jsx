import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import CartCard from "./CartCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box } from "@mui/system";
import stripe from "../../assets/stripe.png";
import coinsgate from "../../assets/coinsgate.png";
function Cart() {
  const init = {
    stripe: true,
    coinsgate: false,
  };
  const [paymentMethos, setPaymentMethods] = React.useState(init);
  const handleChange = (event) => {
    setPaymentMethods(event.target.value);
  };
  return (
    <>
      <div className="w-full p-5  mx-auto mt-20 bg-white rounded-xl shadow-md overflow-hidden ">
        <div className="mx-10 font-bold">Cart</div>
        <div className="md:flex lg:flex xs:flex w-full">
          <div className="p-5 md:w-9/12 sm:w-full bg-[#F9F9F9]">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CartCard
                  title="Title"
                  image="https://img.etimg.com/thumb/msid-81665369,width-300,imgsize-143649,,resizemode-4,quality-100/ecom-agencies.jpg"
                  alt="image1"
                  desc="Description1"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CartCard
                  title="Title"
                  image="https://img.etimg.com/thumb/msid-81665369,width-300,imgsize-143649,,resizemode-4,quality-100/ecom-agencies.jpg"
                  alt="image1"
                  desc="Description1"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CartCard
                  title="Title"
                  image="https://img.etimg.com/thumb/msid-81665369,width-300,imgsize-143649,,resizemode-4,quality-100/ecom-agencies.jpg"
                  alt="image1"
                  desc="Description1"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CartCard
                  title="Title"
                  image="https://img.etimg.com/thumb/msid-81665369,width-300,imgsize-143649,,resizemode-4,quality-100/ecom-agencies.jpg"
                  alt="image1"
                  desc="Description1"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CartCard
                  title="Title"
                  image="https://img.etimg.com/thumb/msid-81665369,width-300,imgsize-143649,,resizemode-4,quality-100/ecom-agencies.jpg"
                  alt="image1"
                  desc="Description1"
                />
              </Grid>
            </Grid>
          </div>
          <div className=" w-1/5 md:mx-10 place-content-center  ">
            <Grid
              container
              style={{ background: "#F9F9F9", width: "100%", padding: "2em" }}
              spacing={2}
            >
              <Grid item xs={12} md={12} sx={{ marginLeft: "1.5em" }}>
                <Typography
                  // variant='h6'
                  fontWeight="bold"
                  // marginBottom="1em"
                >
                  Checkout
                </Typography>
                <p style={{ marginBottom: "3em", fontSize: "15px" }}>
                  Total : $40
                </p>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    fullWidth
                  >
                    <Paper
                      sx={{
                        padding: "1em",
                        marginBottom: "1em",
                        display: "flex",
                      }}
                    >
                      <FormControlLabel
                        fullWidth
                        onChange={handleChange}
                        checked={paymentMethos === "stripe"}
                        name="stripe"
                        value={paymentMethos.stripe}
                        control={<Radio />}
                        label="Pay via "
                      />
                      <img src={stripe} />
                    </Paper>
                    <Paper sx={{ padding: "1em", display: "flex" }}>
                      <FormControlLabel
                        onChange={handleChange}
                        checked={paymentMethos === "coinsgate"}
                        name="coinsgate"
                        value={paymentMethos.coinsgate}
                        label="Pay Via Coinsgate"
                        control={<Radio />}
                      />
                      <img src={coinsgate} />
                    </Paper>
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item md={12} xs={12}>
                <div className="p-5">
                  <Button
                    sx={{ marginTop: "2em", background: "black" }}
                    variant="contained"
                  >
                    Place Order
                    <span>
                      <ArrowForwardIcon />
                    </span>
                  </Button>
                </div>
              </Grid>
              <Divider
                variant="middle"
                sx={{
                  width: "93%",
                  margin: "auto",
                  height: "0.5em",
                  marginTop: "1em",
                  background: "black",
                }}
              />
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
