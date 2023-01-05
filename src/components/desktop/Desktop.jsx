import { Divider, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import DesktopLeftPaper from "./LeftCard";
import RightCard from "./RightCard";
import image1 from "../assets/Right1.png";
import image2 from "../assets/Right2.png";
import image3 from "../assets/Right3.png";
import image4 from "../assets/Right4.png";
import image5 from "../assets/Right5.png";
import image6 from "../assets/Right6.png";
import image7 from "../assets/Right7.png";
// import image8 from "../assets/Right8.png";
import { Box } from "@mui/system";
import styles from "./desktopstyle.module.css";
import { useEffect } from "react";
import axios from "../../axios";
import { useState } from "react";
function Desktop() {
  const [tabValue, setValue] = React.useState(0);
const [feedData,setFeedData]=useState([])
const [handPickedData,setHandpickedData]=useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(()=>{
axios.get("/api/getFeed").then((res)=>{
  // console.log(res)
  if(res?.status===200){
    setFeedData(res.data)
  }
})
  },[])
  useEffect(()=>{
axios.get("/api/getFeed").then((res)=>{
  // console.log(res)
  if(res?.status===200){
    setFeedData(res.data)
  }
})
  },[])
  useEffect(()=>{
axios.get("/api/handpicked").then((res)=>{
  // console.log(res)
  if(res?.status===200){
    setHandpickedData(res.data?.handpickedData)
  }
})
  },[])
  return (
    <div className={styles.mainDiv}>
      <DesktopLeftPaper 
      
      
      data={handPickedData}
      
      />
      <Paper className={styles.leftPaper}>
        <Typography className={styles.handPickedTypo}>
          {/* Hands Picked | {handPickedData[0].date} */}
        </Typography>
        <Divider />
        <Grid container>
          <Grid item xs={12} md={6}>
            <RightCard
              heading={
                "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
              }
              alt={"fsb"}
              subheader={"Cointelegraph"}
              date={"23 Nov, 2022"}
              time={"4:29 PM"}
              image={image1}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RightCard
              heading={
                "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
              }
              alt={"fsb"}
              subheader={"Cointelegraph"}
              date={"23 Nov, 2022"}
              time={"4:29 PM"}
              image={image2}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RightCard
              heading={
                "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
              }
              alt={"fsb"}
              subheader={"Cointelegraph"}
              date={"23 Nov, 2022"}
              time={"4:29 PM"}
              image={image3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RightCard
              heading={
                "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
              }
              alt={"fsb"}
              subheader={"Cointelegraph"}
              date={"23 Nov, 2022"}
              time={"4:29 PM"}
              image={image4}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Metaverse" />
            <Tab label="Bitcoin" />
            <Tab label="Ethereum" />
            <Tab label="NFT" />
            <Tab label="CBDC" />
          </Tabs>
        </Box>
        <Divider />
        {tabValue === 0 ? (
          <Grid container>
            <Grid item xs={12} md={6}>
              <RightCard
                heading={
                  "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
                }
                alt={"fsb"}
                subheader={"Cointelegraph"}
                date={"23 Nov, 2022"}
                time={"4:29 PM"}
                image={image5}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RightCard
                heading={
                  "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
                }
                alt={"fsb"}
                subheader={"Cointelegraph"}
                date={"23 Nov, 2022"}
                time={"4:29 PM"}
                image={image6}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RightCard
                heading={
                  "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
                }
                alt={"fsb"}
                subheader={"Cointelegraph"}
                date={"23 Nov, 2022"}
                time={"4:29 PM"}
                image={image7}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RightCard
                heading={
                  "FSB official draws comparison between Crypto market and collapse of Bank of Amsterdam"
                }
                alt={"fsb"}
                subheader={"Cointelegraph"}
                date={"23 Nov, 2022"}
                time={"4:29 PM"}
                image={image7}
              />
            </Grid>
          </Grid>
        ) : tabValue === 1 ? (
          "No Data Availanle for Now Realted to Bitcoin"
        ) : null}
      </Paper>
    </div>
  );
}

export default Desktop;
