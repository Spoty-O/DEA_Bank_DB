import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { API } from '../services/APIService';
import { StyledTableCell, StyledTableRow } from '../utils/tableStyles';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const [page] = React.useState(1);
  const { data: clientsList } = API.useGetClientsQuery(page);
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Clients">
        <TableHead>
          <TableRow className="bg-black">
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>First name</StyledTableCell>
            <StyledTableCell>Last name</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientsList &&
            clientsList.map((row) => (
              <StyledTableRow
                className="cursor-pointer"
                key={row.id}
                onClick={() => {
                  navigate(`/client/${row.id}/`);
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.phone}</TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Clients;