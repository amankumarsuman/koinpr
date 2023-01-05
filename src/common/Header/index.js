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

const Header = () => {
  const cookies = new Cookies();
const location=window.location.href
console.log("params",location)
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [open, setOpen] = React.useState(false);


  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();

  var token=useSelector((state)=>state.cart)
  // console.log(userData,"userData")
  console.log(token,"token")
  

const getUsetByToken=()=>{
  axios
  .post(
    "/api/user/get-user-by-token",
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  )
  .then((res) => {
    // if (!res.data.success) {
    
    //     const data={
    //       notificationType: "error",
    //   notificationMessage: "User is not Verified By Token",
    //     }
    //     dispatch(snackbarNotification(data));

      
    //   navigate("/sign-in");
    // }
  //   const data={
  //     notificationType: "success",
  // notificationMessage: "User is Verified By Token",
  //   }
  //   dispatch(snackbarNotification(data));
    console.log("first",res)
    setUserId(res.data.user._id);
    setUserData(res?.data?.user)
  })
}

  useEffect(() => {
    // let isCancelled=false;
    const auth = cookies.get("auth-token");
    // console.log(auth);
    // if (!auth) {
      //   navigate("/sign-in");
      // }
      // if(!isCancelled){
      axios
        .post(
          "/api/user/get-user-by-token",
          {},
          {
            headers: {
              Authorization: "Bearer " + auth,
            },
          }
        )
        .then((res) => {
          // if (!res.data.success) {
          
          //     const data={
          //       notificationType: "error",
          //   notificationMessage: "User is not Verified By Token",
          //     }
          //     dispatch(snackbarNotification(data));

            
          //   navigate("/sign-in");
          // }
          const data={
            notificationType: "success",
        notificationMessage: "User is Verified By Token",
          }
          dispatch(snackbarNotification(data));
          console.log("first",res)
          setUserId(res.data.user._id);
          setUserData(res?.data?.user)
        })
        // .catch((err) => {
        //   console.log(err, "err");
        //   navigate("/sign-in");
        // });
    // }
    // UserAuthentication();

    // return ()=>{
    //   isCancelled=true
    // }
    getUsetByToken()
  }, [userId]);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isOpenAcc, setIsOpenAcc] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
const dispatch=useDispatch()
  useEffect(() => {
    const auth = cookies.get("auth-token");
    if (!auth) {
      setIsLoggedIn(false);
      return;
    }
    axios
      .post(
        "/api/user/get-user-by-token",
        {},
        {
          headers: {
            Authorization: "Bearer " + auth,
          },
        }
      )
      .then((res) => {
        if (!res.data.success) {
          setIsLoggedIn(false);
          return;
        }
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  });

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const cartNumber = useSelector((state) => state?.cart?.total);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (userType) => {
    setAnchorElUser(null);

  };
  const handleUserTypeOrderHistory=(userType)=>{
    // console.log(userType,"userType")
    setAnchorElUser(null);
if(userType==="PUBLISHER"){
  navigate("/wallet-publisher")
}else if(userType==="ADVERTISER"){
  //navigate to order history
  navigate("/wallet-advertiser")
  
}
  }

  const signOutHandler = () => {
    cookies.remove("auth-token");
    handleSignout();
    const data={
      notificationType: "success",
        notificationMessage: "Logged Out Successfully",
    }
    dispatch(snackbarNotification(data));

    navigate("/sign-in");
    // setOpen(true);
    setAnchorElUser(null);
  };

  const handleSignout = (event) => {
    // setOpen(true);
  };
  const handleTelegram=()=>{
    setAnchorElUser(null);
    setOpen(true);


  }
  return (
    <>
      <div className="hidden md:block lg:block">
        <div className="Header" onClick={() => setIsOpenAcc(false)}>
          <div className="left" onClick={() => navigate("/")}>
            <span className="heading">Koinpr</span>
            <span className="subHeading">
              A <b>Todayq</b> Product
            </span>
          </div>
          <div className="right">
            {isLoggedIn?
            
            <span onClick={() => navigate("/")}>Publishers</span>:null
          }
            {/* <span
              className="myAccount"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenAcc(!isOpenAcc);
              }}
            >
              My Account
              {isOpenAcc && (
                <div className="dropdown">
                  <span onClick={() => navigate("/profile")}>My Profile</span>
                  <span>Order History</span>
                  <span>Telegram</span>
                </div>
              )}
            </span> */}
            {isLoggedIn?
            <IconButton onClick={() => navigate("/cart")} aria-label="cart">
              <StyledBadge badgeContent={cartNumber} color="primary">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </StyledBadge>
            </IconButton>:null
            
          }
            {/* <span onClick={signOutHandler}>
              {isLoggedIn ? "Sign Out" : "Sign-In"}
            </span> */}

            {isLoggedIn?
           
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography onClick={() => navigate("/profile")} textAlign="center">My Profile</Typography>
                </MenuItem>
                <MenuItem onClick={()=>handleUserTypeOrderHistory(userData?.userType)}>
                  <Typography textAlign="center">{userData?.userType==="ADVERTISER"?"Order History":userData?.userType==="PUBLISHER"?"Wallet History":null}</Typography>
                </MenuItem>
                <MenuItem onClick={handleTelegram}>
                  <Typography textAlign="center">Telegram</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/add-listing">
                    {userData?.userType==="PUBLISHER"?"Add Listing":null}
                    
                    </Link>
                    </Typography>
                </MenuItem>
                <MenuItem onClick={signOutHandler}>
                  <Typography textAlign="center">
                    {isLoggedIn ? 
                      <span onClick={handleSignout}>Sign Out</span>
                  : 
                  location==="http://localhost:3000/sign-up"? "Sign In":"Sign Up"
                    }
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>:
            <span>
              {location==="http://localhost:3000/sign-up"?<Link to="/sign-in">
              Log In
              
              </Link>:<Link to="/sign-up">
              Sign Up
              
              </Link>}
              

            </span>
          }
          </div>
        </div>
      </div>
      <div >
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button> */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          sx={{backgroundImage:"#F9F9F9 !important"}}
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <div style={{ textAlign: "center" }}>
            <ReportProblemIcon sx={{ fontSize: "50px" }} />
          </div> */}
          {/* <DialogContent>
            <DialogContentText variant="h5" id="alert-dialog-slide-description">
              Dou you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Disagree
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Agree
            </Button>
          </DialogActions> */}
          <DialogContent>
 <div className='popup'>


        <div className='content'>
            <DialogTitle className='title'>Add Your Telegram</DialogTitle>
            <div className='input'>
                <input className='ip' type='text' placeholder={"Your telegram @username"} />
                {/* { props.input2 && <input className='ip ip1' type='text' placeholder={props.input2} />} */}
            </div>
            <button  type='submit' className='submit'>Submit <ArrowForwardIcon/></button>

            <div style={{width:"272px",margin:"auto"}}>
            This will help your account manager to commute with you faster.  
            </div>
            {/* <div className='bottom'>Facing issues? <a href='/'>Contact support</a> </div> */}
        </div>
          <Divider variant="middle" sx={{border:"3px solid black",background:"black"}}/>
    </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="md:hidden lg:hidden sm:block">
        <MobileHeader />
      </div>
    </>
  );
};

export default memo(Header);
