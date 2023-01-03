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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const rows = [
    {date:"10 Aug, 2022",id:"2313426",desc:"Added wallet balance",amount:"$10"},
    {date:"12 Aug, 2022",id:"2313421",desc:"Paid for orders",amount:"$20"},
    {date:"09 Aug, 2022",id:"2313429",desc:"Order Cancelled",amount:"$10"},

  ];

export default function WalletPublisherTable() {
  return (
    <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={{border:"1px solid black"}} align="center">Date</TableCell>
            <TableCell sx={{border:"1px solid black"}} align="center">ID</TableCell>
            <TableCell sx={{border:"1px solid black"}} align="center">Description</TableCell>
            <TableCell sx={{border:"1px solid black"}} align="center">Amount</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
       <TableRow key={row.i}>
       <TableCell sx={{border:"1px solid black"}} align="center">
         {row.date}
       </TableCell>
       <TableCell sx={{border:"1px solid black"}} align="center">{row.id}</TableCell>
       <TableCell sx={{border:"1px solid black"}}align="center">{row.desc}</TableCell>
       <TableCell sx={{border:"1px solid black"}}align="center">{row.amount}</TableCell>
       
     </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
