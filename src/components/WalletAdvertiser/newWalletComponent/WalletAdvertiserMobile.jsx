import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
    fontWeight:"bold",
    border:"1px solid black"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  // border:"1px solid black",

  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  // border:"1px solid black",

  },
  // border:"1px solid black",
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));



// const rows = [
//     {date:"10 Aug, 2022",id:"2313426",desc:"Added wallet balance",amount:"$10"},
//     {date:"12 Aug, 2022",id:"2313421",desc:"Paid for orders",amount:"$20"},
//     {date:"09 Aug, 2022",id:"2313429",desc:"Order Cancelled",amount:"$10"},

//   ];

export default function WalletAdvertiserTableMobile({data}) {
  return (

    <>
    <h3 style={{fontSize:"15px",fontWeight:600,margin:"10px 20px 20px 10px"}} >
    Order History
    </h3>
    <TableContainer component={Paper}>
      <Table sx={{ width: 300,margin:"auto" }} aria-label="customized table">
        {/* <TableHead> */}
        {data?.map((row)=>(
<>

          <StyledTableRow >
            <StyledTableCell variant="head" align="center">Date</StyledTableCell>
            {/* <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell> */}
 <StyledTableCell sx={{
    border:"1px solid black"

 }} align="center">
         {row.date}
       </StyledTableCell>

          </StyledTableRow>
          <StyledTableRow>

       <StyledTableCell variant="head" align="center">ID</StyledTableCell>
          <StyledTableCell sx={{
    border:"1px solid black"

 }} align="center">
          {row.id}
        </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>

       <StyledTableCell variant="head" align="center">Description</StyledTableCell>
          <StyledTableCell sx={{
    border:"1px solid black"

 }} align="center">
          {row.desc}
        </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>

       <StyledTableCell variant="head" align="center">Amount</StyledTableCell>
          <StyledTableCell sx={{
    border:"1px solid black"

 }} align="center">
          {row.amount}
        </StyledTableCell>
          </StyledTableRow>
          <br/>
</>
 
        ))}
     
   
      </Table>
    </TableContainer>
    </>
  );
}
