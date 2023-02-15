import "./WalletPublisher.scss";

import React from "react";
import WalletPublisherTable from "./walletPublisher/WalletPublisherTable";
import WalletPublisherTableVertical from "./walletPublisher/WalletPublisherVertical";
import { useState } from "react";
import axios from "../../axios";
import { useEffect } from "react";
import { snackbarNotification } from "../../redux/snackbar.action";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const WalletPublisher = () => {
  const init = {
    method: "",
    amount: "",
  };
  const [input, setInput] = useState(init);
  const [withdrawAmount, setWithdrawAmount] = useState();
  const [currentBalance, setCurrentBalance] = useState(100);
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    const { method, amount } = input;
    if (currentBalance == 0) {
      alert("Insufficient Current Balance");
    }
    axios
      .post("https://koinprapi.onrender.com/api/withdraw/addWithdrawRequest", {
        method,
        amount,
        // userId:userId,
        Headers: {
          token: "koinpratodayqproductrsstoken",
        },
      })
      .then((res) => {
        setWithdrawAmount(res?.data?.withdrawRequestData);
        setCurrentBalance(currentBalance - amount);
        const data = {
          notificationType: "success",
          notificationMessage: res?.data?.message,
        };
        dispatch(snackbarNotification(data));
        setInput(init);
      })
      .catch((err) => {
        const data = {
          notificationType: "success",
          notificationMessage: err,
        };
        dispatch(snackbarNotification(data));
      });
  };

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

        // setInput(res?.data?.user);
        setUserData(res?.data?.user);
      })
      .catch((err) => {
        console.log(err, "err");
        navigate("/sign-in");
      });
  }, [userId]);
  console.log(input);
  const [orderHistory, setOrderHistory] = useState();

  //     const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

  // const product = await stripe.products.retrieve(
  //   'prod_N6FENKKNCsQc0H'
  // );

  const getOrderData = async () => {
    await axios
      .get("api/order")
      .then((res) => setOrderHistory(res.data?.OrderList));
  };
  // getOrderData()
  useEffect(() => {
    getOrderData();
  }, []);
  return (
    <div className="WalletPublisher">
      <div className="head">
        <div className="left">
          Current Wallet Balance :${currentBalance}
          {orderHistory?.map((el) =>
            el.desc == "Added Wallet Balance"
              ? `${el.amount - Number(withdrawAmount?.amount)}`
              : "$"
          )}
        </div>
        <div className="right">
          Pending Withdrawl : ${withdrawAmount?.amount}
        </div>
      </div>
      <div className="content">
        <div className="cLeft">
          <div className="mainHeading">Withdraw Funds</div>
          <div className="subHeading">Please enter the amount</div>
          <input
            className="wInput"
            type="number"
            placeholder="Enter Withdrawl Amount"
            name="amount"
            value={input?.amount}
            onChange={handleChange}
          ></input>
          <div className="subHeading sub1">Choose your payment method</div>
          <div className="wInput">
            <label htmlFor="bankTransfer">Bank Transfer</label>
            <input
              type="radio"
              name="method"
              value="bankTransfer"
              id="bankTransfer"
              onChange={handleChange}
            ></input>
          </div>
          <div className="wInput method">
            <label htmlFor="bankTransfer">Cryptocurrency</label>
            <input
              type="radio"
              name="method"
              value="crypto"
              id="crypto"
              onChange={handleChange}
            ></input>
          </div>

          {currentBalance != 0 &&
          currentBalance >= input?.amount &&
          (input?.method === "bankTransfer" || input?.method === "crypto") &&
          input?.amount > 0 ? (
            <button
              // disabled={currentBalance == 0}
              onClick={handleClick}
              style={{ borderRadius: "5px" }}
              className="proceed"
            >
              {"Proceed ->"}
            </button>
          ) : (
            <p style={{ color: "red", marginTop: "10px" }}>
              Your Current Balance is low
              <br />
              Or
              <br />
              your amount is less than 0
            </p>
          )}
        </div>
        <div className="cRight">
          <div className="mainHeading">Wallet History</div>
          <div className="walletTableComponent">
            <div className="hidden md:block">
              {orderHistory?.length > 0 ? (
                <WalletPublisherTable data={orderHistory} />
              ) : (
                "No Data Available"
              )}
            </div>
            <div className="md:hidden sm:block">
              {orderHistory?.length > 0 ? (
                <WalletPublisherTableVertical data={orderHistory} />
              ) : (
                "No Data Available"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPublisher;
