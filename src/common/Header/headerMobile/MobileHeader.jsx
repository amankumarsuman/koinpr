import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Badge, Menu, MenuItem, Tooltip } from "@mui/material";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { is } from "immutable";

export default function MobileHeader() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const cookies = new Cookies();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const [open, setOpen] = React.useState(false);

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

  const signOutHandler = () => {
    cookies.remove("auth-token");
    handleSignout();
    navigate("/sign-in");
    // setOpen(true);
    setAnchorElUser(null);
  };

  const handleSignout = (event) => {
    setOpen(true);
  };

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
            sx={{ fontSize: "1rem", paddingLeft: "10%" }}
          >
            <div style={{ fontWeight: "bold" }}>Koinpr</div>
            <p>
              A <span style={{ fontWeight: "bold" }}>Todayq</span> Product
            </p>
          </Typography>
{isLoggedIn?

          <IconButton onClick={() => navigate("/cart")} aria-label="cart">
            <StyledBadge badgeContent={cartNumber} color="primary">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </StyledBadge>
          </IconButton>:null
}
{isLoggedIn?

          <Box sx={{ flexGrow: 0, marginLeft: "3em" }}>
            <Tooltip title="Open Profile">
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  onClick={() => navigate("/profile")}
                  textAlign="center"
                >
                  My Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Order History</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Telegram</Typography>
              </MenuItem>
              <MenuItem onClick={signOutHandler}>
                <Typography textAlign="center">
                  {isLoggedIn ? (
                    <span onClick={handleSignout}>Sign Out</span>
                  ) : (
                    "Sign-In"
                  )}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>:
          <span>
            <Link style={{marginLeft:"60px"}} to="/sign-in" >
            Log In
            </Link>
          </span>
}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
