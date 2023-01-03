import { Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import order from  "../../../assets/order.png"
function OrderDetails() {

  const {orderDetailsData}=useSelector((state)=>state)
  console.log(orderDetailsData,"orderDetailsData")
  return (
    <Paper  elevation={3}style={{display:"flex"}}>
        <Paper sx={{marginTop:"100px"}} >
          <h1 style={{width:"250px",margin:"auto",textAlign:"center"}}>

            Your order is successfully created you ll recieve the order details soon
          </h1>
          {/* <h1>Order Details</h1>
          {orderDetailsData?.map((el)=>{
            <>
            <h1>Quantity:{el?.quantity}</h1>
            <h1>Amount:{el?.price}</h1>
            </>
          })} */}
        </Paper>
        <div>
          <img src={order}/>
        </div>
    </Paper>
  )
}

export default OrderDetails