import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../utils/tableStyles';
import { IClientData } from '../models/types';
import { useNavigate } from 'react-router-dom';

interface ClientsListProps {
  list: any[];
  link: string;
  key: string;
}

const TableComponent: React.FC<ClientsListProps> = ({ list, link, key }) => {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Clients">
        <TableHead>
          <TableRow className="bg-black">
            {list && <StyledTableCell>{list}</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {list &&
            list.map((row) => (
              <StyledTableRow
                className="cursor-pointer"
                key={row.id}
                onClick={() => {
                  navigate(`/${link}/${key}/`);
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

export default TableComponent;
