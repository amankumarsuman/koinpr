import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../../axios";
import "./Profile.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { snackbarNotification } from "../../redux/snackbar.action";
import { useDispatch } from "react-redux";
import { Button, Divider, Slide } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProfileAdvertiser = () => {
  const init = {
    address: "",
    // bankTransfer: "",
    companyId: "",
    companyName: "",
    email: "",
    firstName: "",
    country: "",
    countryOfResidency: "",
    cryptoCurrency: false,

    emailVerified: false,
    fullName: "",
    lastName: "",
    representCompany: false,
    tokenType: "",
    userType: "",
    walletAddress: "",
    bankTransfer: true,
    accountNo: null,
    swiftCode: null,
    bankName: "",
    doc: null,
  };

  const cookies = new Cookies();
  const navigate = useNavigate();
  const [input, setInput] = useState(init);
  const [document, setDocument] = useState(null);
  const [step, setStep] = useState(1);

  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [emailOtp, setEmailOtp] = useState();
  const [preview, setPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const handleEmailOtp = (e) => {
    setEmailOtp(e.target.value);
  };

  const handlePreview = () => {
    setPreview(true);
  };

  console.log(input, "input");
  const handleNext = () => {
    setStep(2);
  };
  const submitOtp = () => {
    axios
      .post("api/user/verifyOtp", {
        userId: userId,
        otp: emailOtp,
      })
      .then((res) => {
        if (res?.data?.status === "Verified") {
          console.log(res?.data);
          const data = {
            notificationType: "success",
            notificationMessage: res?.data?.message,
          };
          dispatch(snackbarNotification(data));
          navigate("/");
          setOpen(false);
        }
        if (res?.data?.status !== "Verified") {
          // <CustomizedDialogs
          //   open={showDialog}
          //   setShowDialog={setShowDialog}
          //   err={res?.data?.message}
          // />;
          console.log("error", res);
          // alert("res?.data?.message");
          // setShowDialog(true);
          const data = {
            notificationType: "error",
            notificationMessage: res?.data?.message,
          };
          dispatch(snackbarNotification(data));
        }
      })
      .catch((err) => {
        if (!err?.response?.data?.success) {
          // setShowDialog(true);
          // <CustomizedDialogs
          //   showDialog={true}
          //   setShowDialog={setShowDialog}
          //   err={err?.response?.data?.message}
          // />;
          // alert(err?.response?.data?.message);
          const data = {
            notificationType: "error",
            notificationMessage: err?.response?.data?.message,
          };
          dispatch(snackbarNotification(data));
        }
        // console.log("err", err);
        // console.log("err", err?.response?.data?.message);
      });
  };
  console.log(userData, "userData");
  const dispatch = useDispatch();
  // console.log(input);

  useEffect(() => {
    const auth = cookies.get("auth-token");
    if (!auth) {
      navigate("/sign-in");
    }
    axios
      .post(
        "api/user/get-user-by-token",
        {},
        {
          headers: {
            Authorization: "Bearer " + auth,
          },
        }
      )
      .then((res) => {
        if (!res.data.success) {
          navigate("/sign-in");
        }
        setUserId(res.data.user._id);

        setInput(res?.data?.user);
        setUserData(res?.data?.user);
      })
      .catch((err) => {
        console.log(err, "err");
        navigate("/sign-in");
      });
  }, [userId]);

  const handleAccountDetalsCheck = (e) => {
    // string passed in
    // a string returned by default
    // console.log(e.currentTarget.value);
    // add + to the event to make the value a number
    setStep(+e.currentTarget.value);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    // console.log(name,value,"checked")
    if (name === "representCompany") {
      setInput({ ...input, representCompany: checked });
    } else if (name === "cryptoCurrency") {
      setInput({ ...input, cryptoCurrency: checked });
    } else if (name === "bankTransfer") {
      setInput({ ...input, bankTransfer: checked });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleDocument = (e) => {
    setDocument(e.target.files[0]);
  };
  // console.log(input, "input");

  const handleSubmit = () => {
    const {
      address,
      bankTransger,
      companyId,
      companyName,
      email,
      firstName,
      country,
      countryOfResidency,
      cryptoCurrency,
      emailVerified,
      fullName,
      lastName,
      representCompany,
      tokenType,
      userType,
      walletAddress,
      bankTransfer,
      bankName,
      swiftCode,
      accountNo,
    } = input;
    const token = cookies.get("auth-token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .patch(
        `api/user/update/${userId}`,
        {
          address,
          bankTransger,
          companyId,
          companyName,
          email,
          firstName,
          country,
          countryOfResidency,
          cryptoCurrency,
          emailVerified,
          fullName,
          lastName,
          representCompany,
          tokenType,
          userType,
          walletAddress,
          bankTransfer,
          accountNo,
          swiftCode,
          bankName,
        },
        config
      )
      .then((res) => {
        if (res?.data?.success) {
          navigate("/");

          const data = {
            notificationType: "success",
            notificationMessage: "Record Updated successfully",
          };
          dispatch(snackbarNotification(data));
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
          const data = {
            notificationType: "error",
            notificationMessage: res?.data?.message,
          };
          dispatch(snackbarNotification(data));
        }
      })
      .catch((err) => {
        if (!err?.response?.data?.success) {
          // setShowDialog(true);
          // <CustomizedDialogs
          //   showDialog={true}
          //   setShowDialog={setShowDialog}
          //   err={err?.response?.data?.message}
          // />;
          // alert(err?.response?.data?.message);
          const data = {
            notificationType: "error",
            notificationMessage: err?.response?.data?.message,
          };
          dispatch(snackbarNotification(data));
        }
        // console.log("err", err);
        // console.log("err", err?.response?.data?.message);
      });
  };
  const [openDialog, setOpenDialog] = useState(false);

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = (userType) => {
  //   setAnchorElUser(null);

  // };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEmailVerification = () => {
    // setAnchorElUser(null);
    setOpen(true);
    // navigate("/")
  };

  const handlePublisherNext = () => {
    setStep(3);
  };
  console.log(userData, "userData");
  return (
    <>
      <div style={{ position: "relative" }} className="Profile">
        <div className="pLeft">
          <h2 className="lHead">Account Details</h2>
          <p className="cStatus">
            Current Status :{" "}
            <span className="status">
              {userData?.userVerified ? "Verified" : "Pending"}
            </span>
            {/* <span style={{cursor:"pointer"}} onClick={handleEmailVerification}>Pending</span>}</span> */}
          </p>
          <div className="inputs mt40">
            <div className="wInput">
              <label>Identification Details</label>
              <input
                value="1"
                type="radio"
                name="account"
                // className="round"

                onChange={handleAccountDetalsCheck}
                checked={step === 1}
              ></input>
            </div>
            <div className="wInput mt20">
              <label>Upload Documents</label>
              <input
                value="2"
                type="radio"
                name="account"
                onChange={handleAccountDetalsCheck}
                checked={step === 2}
                // disabled={input?.companyName.length==0 ||input?.companyId?.length==0}
              ></input>
            </div>
            {
              // input?.representCompany &&
              input?.userType === "PUBLISHER" ? (
                <div className="wInput mt20">
                  <label>Withdrawl Options</label>
                  <input
                    type="radio"
                    onChange={handleAccountDetalsCheck}
                    name="account"
                    value="3"
                    checked={step === 3}
                  ></input>
                </div>
              ) : null
            }
          </div>
        </div>
        <div className="pRight">
          {step === 1 && (
            <>
              <h2 className="pHeading">Identification Details</h2>
              <p className="cStatus mt15">
                Your details will be used for billing and generating invoice
              </p>
              <div className="inputs">
                <div className="wInput mt40">
                  <label htmlFor="represent">I represent a company</label>
                  <input
                    disabled={
                      userData?.firstName?.length > 0 &&
                      userData?.lastName?.length > 0
                    }
                    className=".chHeight"
                    id="represent"
                    type="checkbox"
                    name="representCompany"
                    checked={input?.representCompany}
                    value={input?.representCompany}
                    // onChange={companyCheckboxHandler}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p className="cStatus mt40">Enter your details</p>
              {input?.representCompany ? (
                <div className="inputs df mt25">
                  <input
                    // onChange={changeHandler}
                    onChange={handleChange}
                    className="wInput"
                    placeholder="Company Name"
                    name="companyName"
                    value={input?.companyName}
                    // disabled={userData?.userVerified}
                    disabled={userData?.companyName?.length > 0}
                  />
                  <input
                    // onChange={changeHandler}
                    onChange={handleChange}
                    className="wInput"
                    placeholder="Company Identification No."
                    name="companyId"
                    value={input?.companyId}
                    // disabled={userData?.userVerified}
                    disabled={userData?.companyId?.length > 0}
                  />
                </div>
              ) : (
                <div className="inputs df mt25">
                  <input
                    // onChange={changeHandler}
                    onChange={handleChange}
                    className="wInput"
                    placeholder="First Name"
                    name="firstName"
                    value={input?.firstName}
                    // disabled={userData?.userVerified}
                    disabled={userData?.firstName?.length > 0}
                  />
                  <input
                    // onChange={changeHandler}
                    onChange={handleChange}
                    className="wInput"
                    placeholder="Last Name"
                    name="lastName"
                    value={userData?.lastName}
                    disabled={userData?.lastName?.length > 0}
                  />
                </div>
              )}
              <div className="inputs df mt25">
                <input
                  className="wInput"
                  placeholder="Country"
                  // onChange={changeHandler}
                  onChange={handleChange}
                  name="country"
                  value={input?.country}
                  // disabled={userData?.userVerified}
                  disabled={userData?.country?.length > 0}
                />
                <input
                  className="wInput"
                  placeholder="Address"
                  // onChange={changeHandler}
                  onChange={handleChange}
                  name="walletAddress"
                  value={input?.walletAddress}
                  // disabled={userData?.userVerified}
                  disabled={userData?.walletAddress?.length > 0}
                />
              </div>

              {input?.representCompany ? (
                <span>
                  {input?.companyName?.length > 0 &&
                  input?.companyId?.length > 0 &&
                  input?.country?.length > 0 &&
                  input?.walletAddress?.length > 0 ? (
                    // input?.walletAddress?.length>0 && input?.country?.length>0 && input?.lastName?.length>0?

                    <button
                      type="button"
                      className="pButton mt40"
                      onClick={handleNext}
                      style={{ borderRadius: "5px" }}
                    >
                      Next
                      <ArrowForwardIcon />
                    </button>
                  ) : (
                    <span style={{ color: "red" }}>All field is Mandatory</span>
                  )}
                </span>
              ) : (
                <span>
                  {input?.lastName?.length > 0 &&
                  input?.firstName?.length > 0 &&
                  input?.country?.length > 0 &&
                  input?.walletAddress?.length > 0 ? (
                    <button
                      type="button"
                      className="pButton mt40"
                      onClick={handleNext}
                      style={{ borderRadius: "5px" }}
                    >
                      Next
                      <ArrowForwardIcon />
                    </button>
                  ) : (
                    "All field is mandatory"
                  )}
                </span>
              )}

              <p className="pBottom">
                Please make sure that the details you enter here matches the
                documents you will be providing for verification.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="pHeading">Upload Documents</h2>
              <p className="cStatus mt15">
                Please upload the required documents below in order to validate
                your Identification Details.
              </p>
              <div className="inputs">
                <div className="wInput mt40">
                  <label>
                    {!document ? (
                      "Choose Document Type"
                    ) : !preview ? (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={handlePreview}
                      >
                        Preview
                      </span>
                    ) : null}
                  </label>
                  {preview ? (
                    <img
                      // style={{
                      //   height: "300px",
                      //   width: "300px",
                      //   // borderRadius: "50%",
                      // }}
                      src={URL.createObjectURL(document)}
                      alt="Uploaded Image"
                    />
                  ) : null}
                </div>
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderColor: "black",
                    marginTop: "20px",
                    textTransform: "none",
                  }}
                  component="label"
                >
                  {!document ? " Upload File +" : " Change File +"}
                  <input
                    onChange={handleDocument}
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                  />
                </Button>
              </div>
              <p className="pBottom">
                Max file size 5 MB. Supported file types: png, jpeg, pdf, doc.
              </p>
              {/* {input?.doc?.length>0? */}
              {input?.userType === "PUBLISHER" ? (
                <button
                  onClick={handlePublisherNext}
                  style={{ borderRadius: "5px" }}
                  type="button"
                  className="pButton mt40"
                >
                  {"Next ->"}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  style={{ borderRadius: "5px" }}
                  type="button"
                  className="pButton mt40"
                >
                  {"Proceed ->"}
                </button>
              )}

              {/* } */}
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="pHeading">Withdrawal Option</h2>
              <p className="cStatus mt15">Select Your Withdrawal Method</p>
              {/* <div className="inputs">
                <div className="inputs df mt25">
                  <input
                    type="text"
                    className="wInput"
                    placeholder="Bank Transfer/SWIFT"
                  ></input>
                  <input
                    type="text"
                    className="wInput"
                    placeholder="Cryptocurrency"
                  ></input>
                </div>
              </div> */}
              <div className="inputs withopt">
                <div className="wInput mt20">
                  <label>Bank Transfer/SWIFT</label>
                  <input
                    value="bt"
                    type="checkbox"
                    name="bankTransfer"
                    // onChange={handleWithdrawlMethod}
                    onChange={handleChange}
                    // checked={withMethod === "bt"}
                    checked={input?.bankTransfer}
                  ></input>
                </div>
                <div className="wInput mt20">
                  <label>Cryptocurrency</label>
                  <input
                    value={input?.cryptoCurrency}
                    type="checkbox"
                    name="cryptoCurrency"
                    // onChange={handleWithdrawlMethod}
                    onChange={handleChange}
                    // checked={withMethod === "crypto"}
                    checked={input?.cryptoCurrency}
                  ></input>
                </div>
              </div>
              <p className="cStatus mt40">
                {input?.bankTransfer
                  ? "Enter your bank details"
                  : "Enter Your Wallet Details"}
              </p>
              {input?.bankTransfer ? (
                <>
                  <div className="inputs df mt25">
                    <input
                      type="text"
                      placeholder="Beneficiary Name"
                      className="wInput"
                      name="fullName"
                      value={input?.fullName}
                      disabled={userData?.fullName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder="IBAN/Account No."
                      className="wInput"
                      name="accountNo" //variable is not coming from backend
                      onChange={handleChange}
                      value={input?.accountNo}
                      disabled={userData?.accountNo}
                    />
                  </div>
                  <div className="inputs df mt25">
                    <input
                      type="text"
                      onChange={handleChange}
                      value={input?.swiftCode}
                      disabled={userData?.swiftCode}
                      placeholder="SWIFT Code"
                      className="wInput"
                      name="swiftCode" //variable is not coming from backend
                    />
                    <input
                      type="text"
                      placeholder="Bank Name"
                      className="wInput"
                      name="bankName" //variable is not coming from backend
                      onChange={handleChange}
                      value={input?.bankName}
                      disabled={userData?.bankName}
                    />
                  </div>

                  {input?.swiftCode?.length > 0 &&
                  input?.bankName?.length > 0 &&
                  input?.accountNo?.length > 0 &&
                  input?.fullName?.length > 0 ? (
                    <button
                      style={{ borderRadius: "5px" }}
                      onClick={handleSubmit}
                      type="button"
                      className="pButton mt40"
                    >
                      {"Proceed ->"}
                    </button>
                  ) : (
                    <p style={{ color: "red" }}>All fields are Mandatory</p>
                  )}
                </>
              ) : input?.cryptoCurrency ? (
                <>
                  <div className="inputs df mt25">
                    <input
                      type="text"
                      placeholder="Token Type: USDT (TRC20)"
                      className="wInput"
                      name="tokenType"
                      value={input?.tokenType}
                      disabled={userData?.tokenType}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder="Wallet Address"
                      className="wInput"
                      name="walletAddress"
                      value={input?.walletAddress}
                      disabled={userData?.walletAddress}
                      onChange={handleChange}
                    />
                  </div>
                  {input?.tokenType?.length > 0 &&
                  input?.walletAddress?.length > 0 ? (
                    <button
                      style={{ borderRadius: "5px" }}
                      onClick={handleSubmit}
                      type="button"
                      className="pButton mt40"
                    >
                      {"Proceed ->"}
                    </button>
                  ) : (
                    <p style={{ color: "red" }}>All fields are Mandatory</p>
                  )}
                </>
              ) : null}

              <p className="pBottom">
                We will automatically generate a withdrawal request at the end
                of every month depending on your selected preference.{" "}
              </p>
            </>
          )}
        </div>
      </div>

      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Slide in alert dialog
        </Button> */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
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
            <div className="popups">
              <div className="contents">
                <DialogTitle className="titles">
                  Add Your Verification Code
                </DialogTitle>
                <div className="inputs">
                  <input
                    style={{ marginLeft: "2em" }}
                    className="ips"
                    name="emailOtp"
                    value={emailOtp}
                    type="texts"
                    onChange={handleEmailOtp}
                    placeholder={"Your Email Otp 1234"}
                  />
                </div>
                <button
                  type="submit"
                  style={{ marginLeft: "2em", borderRadius: "5px" }}
                  onClick={submitOtp}
                  className="submits"
                >
                  Submit <ArrowForwardIcon />
                </button>

                <div style={{ width: "272px", margin: "auto" }}>
                  This will help your account manager to commute with you
                  faster.
                </div>
              </div>
              <Divider
                variant="middle"
                sx={{
                  border: "3px solid black",
                  background: "black",
                  marginTop: "33px",
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ProfileAdvertiser;
