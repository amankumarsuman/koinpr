import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function ProfileAdvertiser() {



    const [accountDetails, setAccountDetails] = React.useState('Identification');


    const handleChange = (event) => {

        setAccountDetails(event.target.value);

    };


    return (
        <div className="w-full p-3 md:mx-5  mt-20 bg-white rounded-xl  overflow-hidden ">
            <div className="md:flex lg:flex xs:flex justify-center w-full">
                <div   className="p-3 md:w-1/4 sm:w-full bg-[#F9F9F9]">

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={12} sx={{ width: "98%", marginLeft: "1.5em" }}>
                         <p style={{fontWeight:600,fontSize:"22px"}}>

                                Account Details
                         </p>
                       
                            <p style={{ marginBottom: "3em", fontSize: "14px", }}>
                                <span style={{fontWeight:500}}>
                                    Current Status :
                                </span>
                                <span style={{ color: "#108FB7",fontWeight:400 }}>
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
                                    <Paper sx={{ padding: "1em" }}>

                                        <FormControlLabel onChange={handleChange} checked={accountDetails === "accountDetails"} name="accountDetails" value="upload" label="Upload Documents" control={<Radio />} />
                                    </Paper>

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider variant='middle' sx={{ width: "93%", margin: "auto", height: "0.3em", marginTop: "1em", background: "black" }} />

                </div>
                <div  className="p-2 md:ml-16 md:w-3/5 sm:w-full  place-content-center ">
                    <Grid container  style={{background:"#F9F9F9",width:"100%"}} spacing={2}>

                        <Grid item xs={12} md={12} sx={{ width: "98%", marginLeft: "1.5em" }}>
                            <p style={{fontWeight:600,fontSize:"18px"}}>

                             Upload Documents
                            </p>
                         
                            <p style={{ marginBottom: "3em", fontSize: "14px",fontWeight:500 }}>
                            Please upload the required documents below in order to validate your Identification Details.
                            </p>
                            <Paper sx={{width:"250px",padding:"1em",marginBottom:"1em"}}>
                            Choose Document Type
                            </Paper>
                            <Button variant="outlined" component="label">
        Upload File
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <Typography sx={{marginTop:"1em"}}>
      Max file size 5 MB. Supported file types: png, jpeg, pdf, doc.
      </Typography>
      <div className='p-5'>

<Button sx={{ marginTop: "2em",background:"black" }} variant='contained'>
    Proceed<span><ArrowForwardIcon/></span>
</Button>
</div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default ProfileAdvertiser