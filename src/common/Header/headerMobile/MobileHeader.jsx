import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Badge, Dialog, DialogContent, DialogTitle, Divider, Menu, MenuItem, Slide, Tooltip } from "@mui/material";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { is } from "immutable";
import { useState } from "react";
import { snackbarNotification } from "../../../redux/snackbar.action";
import "../Header.scss";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MobileHeader({handleTelegram}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const cookies = new Cookies();
  const [userData, setUserData] = useState();
  const dispatch = useDispatch()
  const location = window.location.href;
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const [open, setOpen] = React.useState(false);
  const authNew = cookies.get("auth-token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const signOutHandler = () => {
  //   cookies.remove("auth-token");
  //   handleSignout();
  //   navigate("/sign-in");
  //   // setOpen(true);
  //   setAnchorElUser(null);
  // };

  // const handleSignout = (event) => {
  //   setOpen(true);
  // };


  const handleUserTypeOrderHistory = (userType) => {
    // console.log(userType,"userType")
    setAnchorElUser(null);
    if (userType === "PUBLISHER") {
      navigate("/wallet-publisher")
    } else if (userType === "ADVERTISER") {
      //navigate to order history
      navigate("/wallet-advertiser")

    }
  }

  const signOutHandler = () => {
    cookies.remove("auth-token");
    handleSignout();
    const data = {
      notificationType: "success",
      notificationMessage: "Logged Out Successfully",
    }
    dispatch(snackbarNotification(data));
    setIsLoggedIn(false);

    navigate("/sign-in");
    // setOpen(true);
    setAnchorElUser(null);
  };

  const handleSignout = (event) => {
    // setOpen(true);
  };
  // const handleTelegram = () => {
  //   setAnchorElUser(null);
  //   setOpen(true);



  // }
  React.useEffect(() => {
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
        setIsLoggedIn(true);

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
    // getUsetByToken()
  }, [authNew]);


  React.useEffect(() => {
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
        setUserId(res.data.user._id);
        setUserData(res?.data?.user)
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, [userId]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const cartNumber = useSelector((state) => state?.cart?.total);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "6em" }}>
      <AppBar sx={{ background: "black" }} position="fixed">
        <Toolbar sx={{ padding: "0.6em" }} variant="dense">
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            component="a"
            href="/"
            // onClick={() => navigate("/")}
            sx={{ fontSize: "1rem", paddingLeft: "2%" }}
          >
            <div style={{ fontWeight: "bold" }}>Koinpr</div>
            <p>
              A <span style={{ fontWeight: "bold" }}>Todayq</span> Product
            </p>
          </Typography>
          {isLoggedIn ?

            <Box sx={{ flexGrow: 1, marginLeft: "15px" }}>
              <Tooltip title="Open Accout">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography sx={{ color: "white", fontWeight: 500, fontSize: "14px" }}>

                    My Account
                  </Typography>
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

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={() => navigate("/profile")} textAlign="center">My Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleUserTypeOrderHistory(userData?.userType)}>
                  <Typography textAlign="center">{userData?.userType === "ADVERTISER" ? "Order History" : userData?.userType === "PUBLISHER" ? "Wallet History" : null}</Typography>
                </MenuItem>
                <MenuItem onClick={handleTelegram}>
                  <Typography textAlign="center">Telegram</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/add-listing">
                      {userData?.userType === "PUBLISHER" ? "Add Listing" : null}

                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={signOutHandler}>
                  <Typography textAlign="center">
                    {isLoggedIn ?
                      <span onClick={handleSignout}>Sign Out</span>
                      :
                      location === "http://localhost:3000/sign-up" ? "Sign In" : "Sign Up"
                    }
                  </Typography>
                </MenuItem>
              </Menu>
            </Box> :
            <span >
              {/* Login */}
              <Link style={{marginLeft:"60px"}}  to={location==="http://localhost:3000/sign-up"? "/sign-in":"/sign-up"} >
              {isLoggedIn ? 
                     <span onClick={handleSignout}>Sign Out</span>
                 : 
                 location==="http://localhost:3000/sign-up"? "Sign In":"Sign Up"
                   }
              </Link>
            </span>
          }
          {isLoggedIn ?

            <IconButton onClick={() => navigate("/cart")} aria-label="cart">
              <StyledBadge badgeContent={cartNumber} color="primary">
                <ShoppingCartIcon sx={{ color: "white" }} />
              </StyledBadge>
            </IconButton> : null
          }

        </Toolbar>
      </AppBar>

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
 <div className='popups'>


        <div className='contents'>
            <DialogTitle className='titles'>Add Your Telegram</DialogTitle>
            <div className='inputs'>
                <input className='ips' type='texts' placeholder={"Your telegram @username"} />
            </div>
            <button  type='submit' className='submits'>Submit <ArrowForwardIcon/></button>

            <div  style={{width:"200px",margin:"auto",border:"1px solid red"}}>
            This will help your account manager to commute with you faster.  
            </div>
        </div>
          <Divider  sx={{border:"3px solid black",background:"black",marginTop:"33px"}}/>
    </div>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
}
