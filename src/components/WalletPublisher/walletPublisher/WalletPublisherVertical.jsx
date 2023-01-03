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



const rows = [
    {date:"10 Aug, 2022",id:"2313426",desc:"Added wallet balance",amount:"$10"},
    {date:"12 Aug, 2022",id:"2313421",desc:"Paid for orders",amount:"$20"},
    {date:"09 Aug, 2022",id:"2313429",desc:"Order Cancelled",amount:"$10"},

  ];

export default function WalletPublisherTableVertical() {
  return (
    <TableContainer >
      <Table sx={{ width: 250 }} aria-label="customized table">
        {/* <TableHead> */}
        {rows.map((row)=>(
<>

          <TableRow>
            <StyledTableCell variant="head" align="center">Date</StyledTableCell>
            {/* <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell> */}
 <StyledTableCell
 sx={{
  border:"1px solid black"

}}
 align="center">
         {row.date}
       </StyledTableCell>

          </TableRow>
          <TableRow>

       <StyledTableCell variant="head" align="center">ID</StyledTableCell>
          <StyledTableCell 
          sx={{
            border:"1px solid black"
        
         }}
          align="center">
          {row.id}
        </StyledTableCell>
          </TableRow>
          <TableRow>

       <StyledTableCell variant="head" align="center">Description</StyledTableCell>
          <StyledTableCell 
          sx={{
            border:"1px solid black"
        
         }}
          align="center">
          {row.desc}
        </StyledTableCell>
          </TableRow>
          <TableRow>

       <StyledTableCell variant="head" align="center">Amount</StyledTableCell>
          <StyledTableCell 
          sx={{
            border:"1px solid black"
        
         }}
          align="center">
          {row.amount}
        </StyledTableCell>
          </TableRow>
          <br/>
</>
 
        ))}
     
   
      </Table>
    </TableContainer>
  );
}
