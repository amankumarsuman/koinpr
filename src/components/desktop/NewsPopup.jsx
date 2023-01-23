import React from 'react'
import HandpickedHeader from '../../common/Header/HandpickedHeader'
import { SubTabItemsContainer } from './NewsPopupContainer'
import CancelIcon from '@mui/icons-material/Cancel';
import image1 from "../../assets/image.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function NewsPopup() {
  return (
    <div>
        
        <HandpickedHeader/>

        <div style={{backgroundColor:"#F5F5F5",paddingTop:"2em"}}>
    <div style={{backgroundColor:"black",width:"80%",margin:"auto",borderRadius:"5px",color:"white",display:"flex",justifyContent:"space-between",padding:"10px"}}>
<div  style={{marginLeft:"20px"}}>
<img src={image1} alt="image1" style={{color:"white"}}/>
</div>
<div >
    <span style={{display:"flex",justifyContent:"space-between",width:"250px"}}>

    <h1>
        <span><ArrowBackIcon/></span>
        Back
    </h1>
    <h1>Next
    <ArrowForwardIcon/>
    </h1>
    </span>
</div>
<div style={{marginRight:"20px"}}>
    <CancelIcon/>
</div>
    </div>
    <div style={{width:"80%",margin:"auto",height:"90vh",background:"white"}}>

    </div>
        </div>
    </div>
  )
}

export default NewsPopup