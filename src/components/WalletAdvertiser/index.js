import './WalletAdvertiser.scss';

import React, { useEffect, useState } from 'react'
import WalletPublisherTableVertical from '../WalletPublisher/walletPublisher/WalletPublisherVertical';
import WalletAdvertiserTableMobile from './newWalletComponent/WalletAdvertiserMobile';
import axios from '../../axios';

const WalletAdvertiser = () => {

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
        <>
                    <div className="hidden md:block">


        <div className='WalletAdvertiser'>
            <div className='content'>
                <div className='heading'>Order History</div>
                <div className='table'>
                    <table className='walletTable'>
                        <tr>
                            <th>Date</th>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>

                        {orderHistory?.map((data)=>(

                        <tr key={data?.id}>
                            <td>{data?.date}</td>
                            <td>{data?.id}</td>
                            <td>{data?.desc}</td>
                            <td>${data?.amount}</td>
                        </tr>
                        ))}
                       
                    </table>
                </div>
            </div>
        </div>
        </div>
        <div className="md:hidden sm:block">
            <WalletAdvertiserTableMobile data={orderHistory} />

            </div>
        </>
    )
}

export default WalletAdvertiser;