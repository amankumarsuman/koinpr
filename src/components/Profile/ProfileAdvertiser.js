import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "../../axios";
import "./Profile.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
    accountNo:null,
    swiftCode:null,
    bankName:"",
    doc:"",

  };

  const cookies = new Cookies();
  const navigate = useNavigate();
  const [input, setInput] = useState(init);

  const [step, setStep] = useState(1);

  const [userId, setUserId] = useState();
  const [userData,setUserData]=useState()

  // console.log(input);

  useEffect(() => {
    const auth = cookies.get("auth-token");
    if (!auth) {
      navigate("/sign-in");
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
          navigate("/sign-in");
        }
        setUserId(res.data.user._id);

        setInput(res?.data?.user);
        setUserData(res?.data?.user)
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
      accountNo
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
          bankName
        },
        config
      )
      .then((res) => {
        if (res?.data?.success) {
          navigate("/");
          alert("Record Updated successfully");
        }
        // console.log(res);
        if (!res?.data.success) {
          // <CustomizedDialogs
          //   open={showDialog}
          //   setShowDialog={setShowDialog}
          //   err={res?.data?.message}
          // />;
          console.log("error", res);
          alert("res?.data?.message");
          // setShowDialog(true);
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
        alert(err?.response?.data?.message);
        }
        // console.log("err", err);
        // console.log("err", err?.response?.data?.message);
      });
  };
  return (
    <>
      <div className="Profile">
        <div className="pLeft">
          <h2 className="lHead">Account Details</h2>
          <p className="cStatus">
            Current Status : <span className="status">Pending</span>
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
            {input?.representCompany && input?.userType==="PUBLISHER"?  (
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
            ):null}
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
                    className=".chHeight"
                    id="represent"
                    type="checkbox"
                    name="representCompany"
                    checked={input?.representCompany}
                    value={input?.representCompany}
                    // onChange={companyCheckboxHandler}
                    onChange={handleChange}
                  ></input>
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
                    disabled={userData?.companyName}
                  />
                  <input
                    // onChange={changeHandler}
                    onChange={handleChange}
                    className="wInput"
                    placeholder="Company Identification No."
                    name="companyId"
                    value={input?.companyId}
                    disabled={userData?.companyId}
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
                    disabled={userData?.firstName}
                  />
                  <input
                    // onChange={changeHandler}
                    onChange={handleChange}
                    className="wInput"
                    placeholder="Last Name"
                    name="lastName"
                    value={userData?.lastName}
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
                  disabled={userData?.country}
                />
                <input
                  className="wInput"
                  placeholder="Address"
                  // onChange={changeHandler}
                  onChange={handleChange}
                  name="walletAddress"
                  value={input?.walletAddress}
                  disabled={userData?.walletAddress}
                />
              </div>
              {/* <button
                type="button"
                className="pButton mt40"
                onClick={handleSubmit}
              >
                Proceed
                <ArrowForwardIcon />
              </button> */}
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
                  <label>Choose Document Type</label>
                </div>
                <div className="wInput mt40">
                  <input type="file" name="doc" value={input?.doc} />
                </div>
              </div>
              <p className="pBottom">
                Max file size 5 MB. Supported file types: png, jpeg, pdf, doc.
              </p>
              {/* {input?.doc?.length>0? */}
              {input?.userType==="PUBLISHER"?null:
              
              <button style={{borderRadius:"5px"}} type="button" className="pButton mt40">
                {"Proceed ->"}
              </button>
              }
              
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
                </>
              ) : null}

              {/* <button
                onClick={handleSubmit}
                type="button"
                className="pButton mt40"
              >
                Proceed
                <ArrowForwardIcon />
              </button> */}
               <button style={{borderRadius:"5px"}} 
                onClick={handleSubmit}
               
               type="button" className="pButton mt40">
                {"Proceed ->"}
              </button>
              <p className="pBottom">
                We will automatically generate a withdrawal request at the end
                of every month depending on your selected preference.{" "}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileAdvertiser;
