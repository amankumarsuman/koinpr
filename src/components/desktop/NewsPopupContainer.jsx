import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
// import useStyles from "./styles";
import { useLocation } from "react-router-dom";

export const SubTabItemsContainer = ({
  children,
  headingText,
  headingIcon,
  offBackGroundChildCss = false,
  subTable = false,
}) => {
//   const classes = useStyles();
//   const { state } = useLocation();
  return (
    <Container maxWidth="xl" >
      <Paper
     
        // className={!subTable ? classes.mainDiv : classes.mainDivLocal}
        elevation={4}
      >
        <div  >
          <div style={{display:"flex",textAlign:"center"}}>
            <span>{"Back"}</span>
            <h1 >{"Next"}</h1>
            {/* {state === "viewOnly" && (
              <h6 className={classes.headingTextViewOnly}>View Only</h6>
            )}
            {state === "new" && (
              <h6 className={classes.headingTextViewOnly}>New</h6>
            )} */}
          </div>
        </div>
        <br />
        <div 
        // className={classes.formBackgroundParent}
        >
          <div
            // className={
            //   offBackGroundChildCss ? null : classes.formBackgroundChild
            // }
          >
            {children}
          </div>
          {/* <div >{children}</div> */}
        </div>
      </Paper>
    </Container>
  );
};
