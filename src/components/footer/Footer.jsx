import { Paper, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Paper sx={{padding:"5px", position: "absolute",
    bottom: "0px",width:"100%",marginTop:"100%"}} elevation={0}>
        <Typography textAlign="center">
        All rights reserved by Koinpr Marketing Private Limited

        </Typography>
    </Paper>
  )
}

export default Footer