import "./WalletPublisher.scss";

import React from "react";
import WalletPublisherTable from "./walletPublisher/WalletPublisherTable";
import WalletPublisherTableVertical from "./walletPublisher/WalletPublisherVertical";
import { useState } from "react";
import axios from "../../axios";
import { useEffect } from "react";

const WalletPublisher = () => {


  const [orderHistory,setOrderHistory]=useState()

//     const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// const product = await stripe.products.retrieve(
//   'prod_N6FENKKNCsQc0H'
// );


const getOrderData=async()=>{
await axios.get("https://user.koinpr.com/api/order").then((res)=> setOrderHistory(res.data?.OrderList))
}
// getOrderData()
useEffect(()=>{
    getOrderData()
},[])
  return (
    <div className="WalletPublisher">
      <div className="head">
        <div className="left">Current Wallet Balance : {orderHistory?.map((el)=>el.desc=="Added Wallet Balance"?`${el.amount}`:"$")}</div>
        <div className="right">Pending Withdrawl : $20</div>
      </div>
      <div className="content">
        <div className="cLeft">
          <div className="mainHeading">Withdraw Funds</div>
          <div className="subHeading">Please enter the amount</div>
          <input
            className="wInput"
            type="text"
            placeholder="Enter Withdrawl Amount"
          ></input>
          <div className="subHeading sub1">Choose your payment method</div>
          <div className="wInput">
            <label htmlFor="bankTransfer">Bank Transfer</label>
            <input
              type="radio"
              name="method"
              value="bankTransfer"
              id="bankTransfer"
            ></input>
          </div>
          <div className="wInput method">
            <label htmlFor="bankTransfer">Cryptocurrency</label>
            <input
              type="radio"
              name="method"
              value="crypto"
              id="crypto"
            ></input>
          </div>
          <button className="proceed">Proceed</button>
        </div>
        <div className="cRight">
          <div className="mainHeading">Wallet History</div>
          <div className="walletTableComponent">
            <div className="hidden md:block">
            <WalletPublisherTable data={orderHistory} />

            </div>
            <div className="md:hidden sm:block">
            <WalletPublisherTableVertical data={orderHistory} />

            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default WalletPublisher;
