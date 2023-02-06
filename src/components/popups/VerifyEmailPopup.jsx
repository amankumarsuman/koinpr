import { Slide,Divider } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Cookies from 'universal-cookie';

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { snackbarNotification } from '../../redux/snackbar.action';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function VerifyEmailPopup() {
    const data=useSelector((state)=>state?.cart?.authenticatedUserDetails);
    const cookies = new Cookies();

  const [emailOtp,setEmailOtp]=useState();
  const [open, setOpen] = React.useState(true);
  const [email,setEmail]=useState(data?.email);
  const [isEmailEdit,setIsEmailEdit]=useState(false)
const [resendOtp,setResendOtp]=useState(false)
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const handleEmailOtp=(e)=>{
    setEmailOtp(e.target.value)
  }
  const handleClose = (event,reason) => {
    console.log(event==="backdropClick",reason,"event")
    if (reason && reason == "backdropClick") 
        return;
    setOpen(false);
    navigate("/sign-in")
  };


//   useEffect(() => {
//     const auth = cookies.get("auth-token");
//     if (!auth) {
//       navigate("/sign-in");
//     }
//     axios
//       .post(
//         "api/user/get-user-by-token",
//         {},
//         {
//           headers: {
//             Authorization: "Bearer " + auth,
//           },
//         }
//       )
//       .then((res) => {
//         if (!res.data.success) {
//         //   navigate("/sign-in");
//         console.log(res.data)
//         }
//         setUserId(res.data.user._id);

//         setInput(res?.data?.user);
//         setUserData(res?.data?.user)
//       })
//       .catch((err) => {
//         console.log(err, "err");
//         // navigate("/sign-in");
//       });
//   }, [userId]);

  const submitOtp=()=>{

    axios.post("api/user/verifyOtp",{
        userId:data?._id,
        otp:emailOtp
    }).then((res)=>{
      if(res?.data?.status==="Verified"){
        console.log(res?.data)
        const data={
          notificationType: "success",
      notificationMessage: res?.data?.message,
        }
        dispatch(snackbarNotification(data));
        // navigate("/")
        navigate("/sign-in")

        setOpen(false)
    
    
      }
      if (res?.data?.status!=="Verified") {
        // <CustomizedDialogs
        //   open={showDialog}
        //   setShowDialog={setShowDialog}
        //   err={res?.data?.message}
        // />;
        console.log("error", res);
        // alert("res?.data?.message");
        // setShowDialog(true);
        const data={
          notificationType: "error",
      notificationMessage: res?.data?.message,
        }
        dispatch(snackbarNotification(data));
      }
    }) .catch((err) => {
      if (!err?.response?.data?.success) 
      {
      // setShowDialog(true);
      // <CustomizedDialogs
      //   showDialog={true}
      //   setShowDialog={setShowDialog}
      //   err={err?.response?.data?.message}
      // />;
      // alert(err?.response?.data?.message);
      const data={
        notificationType: "error",
    notificationMessage: err?.response?.data?.message,
      }
      dispatch(snackbarNotification(data));
      }
      // console.log("err", err);
      // console.log("err", err?.response?.data?.message);
    });
        
      }
  const handleResendOtp=()=>{

    axios.post("https://koinprapi.onrender.com/api/user/resendOtpVerification",{
        userId:data?._id,
        email:data?.email
    }).then((res)=>{
      if(res?.data?.status){
        console.log(res?.data)
        const data={
          notificationType: "success",
      notificationMessage: res?.data?.message,
        }
        dispatch(snackbarNotification(data));
        // navigate("/")
        navigate("/sign-in")

        setOpen(false)
    
    
      }
      if (res?.data?.status==="Failed") {
        // <CustomizedDialogs
        //   open={showDialog}
        //   setShowDialog={setShowDialog}
        //   err={res?.data?.message}
        // />;
        console.log("error", res);
        // alert("res?.data?.message");
        // setShowDialog(true);
        const data={
          notificationType: "error",
      notificationMessage: res?.data?.message,
        }
        dispatch(snackbarNotification(data));
      }
    }) .catch((err) => {
      if (!err?.response?.data?.success) 
      {
      // setShowDialog(true);
      // <CustomizedDialogs
      //   showDialog={true}
      //   setShowDialog={setShowDialog}
      //   err={err?.response?.data?.message}
      // />;
      // alert(err?.response?.data?.message);
      const data={
        notificationType: "error",
    notificationMessage: err?.response?.data?.message,
      }
      dispatch(snackbarNotification(data));
      }
      // console.log("err", err);
      // console.log("err", err?.response?.data?.message);
    });
        
      }

const toggleEmailBtn=()=>{
  setIsEmailEdit(true)

}

      const submitChangeEmail=()=>{

        const token = cookies.get("auth-token");
    
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        axios
          .patch(
            `https://koinprapi.onrender.com/api/user/update/${data?._id}`,
            {
              
              email:email,
              
            },
            // config
          )
          .then((res) => {
            if (res?.data?.success) {
    console.log(res?.data)
              const data={
                notificationType: "success",
            notificationMessage: "Email Updated successfully",
              }
            dispatch(snackbarNotification(data));
            // navigate("/");
    setIsEmailEdit(false)
              // alert("Record Updated successfully");
            }
            // console.log(res);
            if (!res?.data.success) {
              // <CustomizedDialogs
              //   open={showDialog}
              //   setShowDialog={setShowDialog}
              //   err={res?.data?.message}
              // />;
              console.log("error", res);
              // alert("res?.data?.message");
              // setShowDialog(true);
              const data={
                notificationType: "error",
            notificationMessage: res?.data?.message,
              }
              dispatch(snackbarNotification(data));
            }
          })
          .catch((err) => {
            if (!err?.response?.data?.success) 
            {
            // setShowDialog(true);
            // <CustomizedDialogs
            //   showDialog={true}
            //   setShowDialog={setShowDialog}
            //   err={err?.response?.data?.message}
            // />;
            // alert(err?.response?.data?.message);
            const data={
              notificationType: "error",
          notificationMessage: err?.response?.data?.message,
            }
            dispatch(snackbarNotification(data));
            }
            // console.log("err", err);
            // console.log("err", err?.response?.data?.message);
          });
          }

  return (
   
    <div >
    {/* <Button variant="outlined" onClick={handleClickOpen}>
      Slide in alert dialog
    </Button> */}
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
    //   hideBackdrop
    disableEscapeKeyDown
      onClose={handleClose}
      sx={{ backgroundImage: "#F9F9F9 !important" }}
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
            <DialogTitle className='titles'>Add Your Verification Code</DialogTitle>
            <div className='inputs'>
           {/* <span> */}
              <input style={{marginLeft:"2em",marginBottom:"10px"}} disabled={!isEmailEdit} className='ips' name="email" value={email} type='texts' onChange={(e)=>setEmail(e.target.value)} placeholder={"Your Email"} />
              <button type='submit' style={{marginLeft:"2em",borderRadius:"5px"}} onClick={!isEmailEdit?toggleEmailBtn:submitChangeEmail} className='submits'>{!isEmailEdit?"Change":"Submit"}<ArrowForwardIcon /></button>
           {/* </span> */}
              <input style={{marginLeft:"2em"}}  className='ips' name="emailOtp" value={emailOtp} type='texts' onChange={handleEmailOtp} placeholder={"Your Email Otp 1234"} />
            </div>
            {/* <span className='hidden md:block'>

            <button type='submit' style={{marginLeft:"2em",borderRadius:"5px"}} onClick={submitOtp} className='submits'>Submit <ArrowForwardIcon /></button>
            <button type='submit' style={{marginLeft:"2em",borderRadius:"5px"}} onClick={submitOtp} className='submits'>Resend<ArrowForwardIcon /></button>
            </span> */}
            <span  style={{display:"flex"}}>

            <button type='submit' style={{marginLeft:"2em",borderRadius:"5px"}} onClick={submitOtp} className='submits'>Submit <ArrowForwardIcon /></button>
            <button type='submit' style={{marginLeft:"2em",borderRadius:"5px"}} 
            onClick={handleResendOtp} 
            // onClick={resendClicked}
            className='submits'>Resend<ArrowForwardIcon /></button>
            </span>

            <div style={{ width: "90%",marginLeft:"20px"}}>
              This will help your account manager to commute with you faster.
            </div>
          </div>
          <Divider variant="middle" sx={{ border: "3px solid black", background: "black", marginTop: "33px" }} />
        </div>
      </DialogContent>
    </Dialog>
  </div>
  )
}

export default VerifyEmailPopup