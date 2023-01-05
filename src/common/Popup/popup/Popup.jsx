// import { Grid } from '@mui/material'
// import React from 'react'
// import styles from "./popup.module.css"
// function Popup(props) {
//   return (
//     <div className={styles.poopup}>
//     <div className={styles.content}>
//         <div className={styles.title}>{props.title}</div>
//         <div className={styles.input}>
//             <input className={styles.ip} type='text' placeholder={props.input1} />
//             { props.input2 && <input className={styles.ip1} type='text' placeholder={props.input2} />}
//         </div>
//         <button type='submit' className={styles.submit}>{props.buttonText}</button>
//         <div className={styles.button}>Facing issues? <a className={styles.link} href='/'>Contact support</a> </div>
//     </div>
// </div>
//   )
// }

// export default Popup



import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from '../../../axios';
import { useState } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;


  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Popup(props) {
  const [open, setOpen] = React.useState(true);
  const [userId,setUserId]=useState()
const navigate=useNavigate()
const cookies = new Cookies();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/sign-in")
  };



  // useEffect(()=>{
  //   const auth = cookies.get("auth-token");
  //   console.log(auth);
  //   // if (!auth) {
  //   //   navigate("/sign-in");
  //   // }
  //   axios
  //     .post(
  //       "/api/user/get-user-by-token",
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + auth,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (!res.data.success) {
  //         navigate("/sign-in");
  //       }
  //       setUserId(res.data.user._id);
  //       console.log(" marketplace")
  //     })
  //     .catch((err) => {
  //       console.log(err, "err");
  //       navigate("/sign-in");
  //     });
  // },[])

  return (
    <div >
    
      <BootstrapDialog
      fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
    
      >
        <BootstrapDialogTitle sx={{fontSize:"25px",fontWeight:600,background:"#F9F9F9",textAlign:"center"}} id="customized-dialog-title" onClose={handleClose}>
          {props.title}
        </BootstrapDialogTitle>
        <DialogContent sx={{background:"#F9F9F9 !important",textAlign:"center"}} >
          <div>

         <TextField sx={{textAlign:"center",marginTop:"44px"}} label={props.label1} name={props.name1} variant="outlined" />
          </div>
          <div>

          {props?.name2 &&  <TextField sx={{textAlign:"center",marginTop:"44px"}} label={props.label2} name={props.name2} variant="outlined" />}
          </div>
          <div onClick={handleClose} className='p-5'>

<Button type="submit" sx={{ marginTop: "2em", background: "black" }} variant='contained'>
    Proceed<span><ArrowForwardIcon /></span>
</Button>
</div>
        </DialogContent>
        <div style={{textAlign:"center",marginBottom:"10px"}}>
        Facing issues? <span style={{color:"#108FB7"}}>

        Contact support<ArrowForwardIcon/>
        </span>

        </div>
      </BootstrapDialog>
    </div>
  );
}