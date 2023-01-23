import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../../axios";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./Header.scss";
import MobileHeader from "./headerMobile/MobileHeader";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { AlertDialog } from "../alertDialogue/AlertDialog";
// import Cookies from "universal-cookie";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { memo } from "react";
import { snackbarNotification } from "../../redux/snackbar.action";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HandpickedHeader = () => {
  
const location=window.location.href
// console.log("params",location)

  















 





  return (
    <>
      <div className="hidden md:block lg:block">
        <Paper elevation={3} className="Header" style={{backgroundColor:"white",color:"black"}} >
          <div className="left">
            <span className="heading">Koinpr</span>
            <span className="subHeading">
              A <b>Todayq</b> Product
            </span>
          </div>
        
      <div className="right">
      <span className="myAccount">Download App</span>
      <span className="myAccount">Submit PR</span>

</div>
        </Paper>
      </div>
      <div >
        
          
       
      </div>

      {/* <div className="md:hidden lg:hidden sm:block"> */}
        {/* <MobileHeader handleTelegram={handleTelegram} /> */}
      {/* </div> */}
    </>
  );
};

export default memo(HandpickedHeader);
