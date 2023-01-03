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
import { SetTokenToRedux } from "../../redux/actions";
import { useEffect } from "react";
import { gapi } from "gapi-script";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const cookies = new Cookies();
  const navigate = useNavigate();
const dispatch=useDispatch();
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
      .post("/api/user/login", data)
      .then((res) => {
        if (res?.data?.success) {
          cookies.set("auth-token", res?.data?.user?.token, { path: "/" });
          const payload={
            token:res?.data?.user?.token
          }
        dispatch(SetTokenToRedux(payload))

          navigate("/");
          setOpen(true);
        } else {
          console.log("error", res);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"


useEffect(()=>{
function start(){
  gapi.client.init({
    clientId:clientId,
    scope:""
  })
};
gapi.load("client:auth2",start)
})

const handleLogin = async googleData => {
  
  const res = await axios.post("/api/google/auth",{
      token: googleData.tokenId

  }).then((res)=>console.log(res,"response"))
  //  fetch("/api/v1/auth/google", {
  //     method: "POST",
  //     body: JSON.stringify({
  //     token: googleData.tokenId
  //   }),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  const data = await res.json()
  console.log(data,"data")
  navigate("/")
  // store returned user in a context?
}

  //keyboard interaction
  Usekey("Enter", submitHandler);
  Usekey("NumpadEnter", submitHandler);

  return (
    <div className="signin">
      <div className="content">
        <form onSubmit={submitHandler}>
          <p className="chead">Sign In</p>
          <p className="signUp">
            Don't have an account? <a href="/sign-up">Sign up</a>
          </p>
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`email ${errors.email && "err"}`}
          />
          <span className="error">{errors.email}</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
          />
          <button className={`submitButton`} type="submit">
            Sign In
            <ArrowForwardIcon />
          </button>
        </form>
        {/* <GoogleLogin
    clientId="990734078330-qteq6i15s9cni5apfkt9qv2okudhqk93.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/> */}
        <a href="/forgot-password" className="forgot">
          Forgot password?
        </a>
      </div>
      <div className="allRight">
        All rights reserved by Koinpr Marketing Private Limited
      </div>
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
