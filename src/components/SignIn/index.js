import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../../axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleLogin from "react-google-login";

import "./SignIn.scss";
import { Usekey } from "../../common/keyboardInteraction/KeyboardPress";
import CustomizedSnackbars from "../../common/snackbar/SnackBar";
import { useDispatch } from "react-redux";
import { SetTokenToRedux, SetUserDataToRedux } from "../../redux/actions";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { snackbarNotification } from "../../redux/snackbar.action";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
const SignIn = () => {
  const CustomInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoadings, setIsLoadings] = useState(true);

  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateInput = () => {
    let error = {};
    let formIsValid = true;

    if (email.length === 0) {
      formIsValid = false;
      error.email = "Email cannot be empty";
    } else {
      let lastAtPos = email.lastIndexOf("@");
      let lastDotPos = email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        error.email = "Email is not Valid";
      }
    }
    setErrors(error);
    return formIsValid;
  };

  //for snackbar
  const [open, setOpen] = React.useState(false);

  //  const handleClick = () => {
  //    setOpen(true);
  //  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    const data = {
      email: email,
      password: password,
    };

    axios
      .post("api/user/login", data)
      .then((res) => {
        console.log(res, "response");
        if (res?.data?.success) {
          if (res?.data?.user?.emailVerified) {
            cookies.set("auth-token", res?.data?.user?.token, { path: "/" });
            const payload = {
              token: res?.data?.user?.token,
            };
            dispatch(SetTokenToRedux(payload));

            const data = {
              notificationType: "success",
              notificationMessage: "You Logged In Successfully",
            };
            dispatch(snackbarNotification(data));
            navigate("/");
            setOpen(true);
          } else if (!res?.data?.user?.emailVerified) {
            const data = {
              notificationType: "error",
              notificationMessage: "You Email is not verified Yet",
            };
            dispatch(snackbarNotification(data));
            dispatch(SetUserDataToRedux({ data: res?.data }));

            navigate("/VerifyEmail");
            setOpen(true);
          }
        } else {
          const data = {
            notificationType: "error",
            notificationMessage: "Something went wrong",
          };
          dispatch(snackbarNotification(data));
        }
      })
      .catch((err) => {
        console.log("err", err?.response?.data?.message);
        const data = {
          notificationType: "error",
          notificationMessage: err?.response?.data?.message,
        };
        dispatch(snackbarNotification(data));
      });
  };

  // const clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"

  // useEffect(()=>{
  // function start(){
  //   gapi.client.init({
  //     clientId:clientId,
  //     scope:""
  //   })
  // };
  // gapi.load("client:auth2",start)
  // })

  const handleLogin = async (googleData) => {
    const res = await axios
      .post("/api/google/auth", {
        token: googleData.tokenId,
      })
      .then((res) => console.log(res, "response"));
    //  fetch("/api/v1/auth/google", {
    //     method: "POST",
    //     body: JSON.stringify({
    //     token: googleData.tokenId
    //   }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    const data = await res.json();
    // console.log(data,"data")
    navigate("/");
    // store returned user in a context?
  };

  //keyboard interaction
  Usekey("Enter", submitHandler);
  Usekey("NumpadEnter", submitHandler);

  return (
    <div className="signin">
      <div className="content">
        <form onSubmit={submitHandler}>
          <p className="chead">Sign In</p>
          <p className="signUp">
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
          <input
            style={{ border: "1px solid black", borderRadius: "4px" }}
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`email ${errors.email && "err"}`}
          />
          <span className="error">{errors.email}</span>
          <div style={{ display: "flex" }}>
            <input
              // type="password"
              type={showPassword ? "text" : "password"}
              style={{ border: "1px solid black", borderRadius: "4px" }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password"
            />
            <span
              style={{ marginTop: "27px", marginLeft: "-30px" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>
          {/* <CustomInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      size="small"
                      name="userLockPassword"
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    /> */}
          <button className="submitButton" type="submit">
            Sign In
            <ArrowForwardIcon sx={{ fontSize: "20px", marginLeft: "5px" }} />
          </button>
        </form>
        {/* <GoogleLogin
    clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/> */}
        <Link to="/forgot-password" className="forgot">
          Forgot password?
        </Link>
      </div>
      {/* <div className="allRight">
        All rights reserved by Koinpr Marketing Private Limited
      </div> */}
      {open ? (
        <CustomizedSnackbars
          open={open}
          handleClose={handleClose}
          msg={"You are loggedin successfully!"}
        />
      ) : null}
    </div>
  );
};

export default SignIn;
