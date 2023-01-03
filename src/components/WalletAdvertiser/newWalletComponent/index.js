import { Typography } from '@mui/material'
import React from 'react'
import WalletAdvertiser from './WalletAdvertiser'
import WalletAdvertiserTableMobile from './WalletAdvertiserMobile'

function index() {
  return (
    <>
    
    <div  className='hidden md:block pt-5  '>
        <div style={{background:"#F9F9F9",width:"80%",margin:"auto",paddingBottom:"5em"}}>
            
    <Typography
    sx={{width:"80%",margin:"auto",padding:"3em"}}
        fontWeight="bold"
        >
        Order History 
        </Typography>
<WalletAdvertiser/>
        </div>
    </div>
    <div className='md:hidden sm:block pt-32'>
    <div style={{background:"#F9F9F9",width:"90%",margin:"auto",padding:"1em"}}>

        <Typography
        fontWeight="bold"
        marginBottom="2em"
        >
        Order History 
        </Typography>
<WalletAdvertiserTableMobile/>
</div>
    </div>
    </>
  )
}

export default index