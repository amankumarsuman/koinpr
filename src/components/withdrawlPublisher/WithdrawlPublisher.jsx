import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function WithdrawlPublisher() {

    const init = {
        paymentMethod: "bt",
        amount: "",
        bankname: "",
        swiftCode: "",
        acctno: "",
        benName: "",
    }
    const [input, setInput] = useState(init)

    const [accountDetails, setAccountDetails] = React.useState('Identification');
    const handleChange = (event) => {
        const { name, value } = event.target

        setInput({ ...input, [name]: value })
        if (name === "accountDetails") {

            setAccountDetails(event.target.value);
        }

    };






    return (
        <div className="w-11/12  mx-auto mt-20 bg-white rounded-xl shadow-md overflow-hidden ">
            <div className="md:flex lg:flex xs:flex w-full">
                <div className="p-5 md:w-1/4 sm:w-full bg-[#F9F9F9]">

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={12} sx={{ width: "98%", marginLeft: "1.5em" }}>
                            <Typography
                                variant='h5'
                                fontWeight="bold"
                            // marginBottom="1em"

                            >
                                Account Details
                            </Typography>
                            <p style={{ marginBottom: "3em", fontSize: "15px" }}>
                                <span >
                                    Current Status :
                                </span>
                                <span style={{ color: "#108FB7" }}>
                                    Pending
                                </span>
                            </p>
                            <FormControl >

                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    fullWidth
                                >
                                    <Paper sx={{ padding: "1em", marginBottom: "1em" }}>
                                        <FormControlLabel fullWidth onChange={handleChange} checked={accountDetails === "Identification"} name="accountDetails" value="Identification" control={<Radio />} label="Identification Details" />

                                    </Paper>
                                    <Paper sx={{ padding: "1em", marginBottom: "1em" }}>

                                        <FormControlLabel onChange={handleChange} checked={accountDetails === "accountDetails"} name="accountDetails" value="upload" label="Upload Documents" control={<Radio />} />
                                    </Paper>
                                    <Paper sx={{ padding: "1em" }}>

                                        <FormControlLabel onChange={handleChange} checked={accountDetails === "withdrawl"} name="withdrawl" value="upload" label="Withdrawal Option" control={<Radio />} />
                                    </Paper>

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider variant='middle' sx={{ width: "93%", margin: "auto", height: "0.5em", marginTop: "1em", background: "black" }} />

                </div>
                <div className=" w-full md:mx-10  place-content-center  ">
                    <Grid  container sx={{ background: "#F9F9F9", width: "100%", padding: "2em" }} spacing={2}>

                        <Grid item xs={12} md={12} sx={{ marginLeft: "1.5em" }}>
                            <Typography
                                // variant='h6'
                                fontWeight="bold"
                            // marginBottom="1em"

                            >
                                Withdrawal Option
                            </Typography>
                            <p style={{ marginBottom: "3em", fontSize: "15px" }}>
                                Select Your Withdrawal Method
                            </p>







                        </Grid>
                        <Grid item xs={12} md={4}>

                            <Box sx={{ marginTop: "1em" }}>
                                <FormControl
                                    fullWidth
                                >
                                    <InputLabel id="demo-simple-select-label">Select Your Withdrawal Method</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={input?.paymentMethod}
                                        name="paymentMethod"
                                        label="Select Your Withdrawal Method"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"bt"}>Bank Transfer/SWIFT</MenuItem>
                                        <MenuItem value={"crypto"}>Cryptocurrency</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item md={8}>

                        </Grid>
                        <Grid item xs={12} md={12}>

                            <p style={{ padding: "1em", fontSize: "15px" }}>
                                Enter your bank details
                            </p>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                             fullWidth id="outlined-basic" name="benName" value={input.benName} onChange={handleChange} label="Beneficiary Name" variant="outlined" />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth id="outlined-basic" name="acctno" value={input.acctno} onChange={handleChange} label="IBAN/Account No." variant="outlined" />

                        </Grid>
                        <Grid item md={4}>

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth id="outlined-basic" name="swiftCode" value={input.swiftCode} onChange={handleChange} label="SWIFT Code" variant="outlined" />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth id="outlined-basic" name="bankname" value={input.bankname} onChange={handleChange} label="Bank Name" variant="outlined" />

                        </Grid>
                        <Grid item md={4}>

                        </Grid>

                        <Grid item md={12} xs={12}>

                            <div className='p-5'>

                                <Button sx={{ marginTop: "2em", background: "black" }} variant='contained'>
                                    Proceed<span><ArrowForwardIcon /></span>
                                </Button>
                            </div>
                        </Grid>

                        <p>
                            We will automatically generate a withdrawal request at the end of every month depending on your selected preference.
                        </p>
                    </Grid>


                </div>
            </div>
        </div>
    )
}

export default WithdrawlPublisher