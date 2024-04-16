import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../utils/tableStyles';
// import { useNavigate } from 'react-router-dom';
import { ClientAttributes } from '@backend/types';

interface ClientsListProps {
  list: ClientAttributes[] | undefined;
  setClient: React.Dispatch<React.SetStateAction<ClientAttributes | undefined>>;
}

const TableComponent: React.FC<ClientsListProps> = ({ list, setClient }) => {
  // const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Clients">
        <TableHead>
          <TableRow className="bg-black">
            {list &&
              Object.keys(list[0]).map((value) => (
                <StyledTableCell key={value}>{value}</StyledTableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {list &&
            list.map((row) => (
              <StyledTableRow
                className="cursor-pointer"
                key={row.id}
                onClick={() => {
                  setClient(row);
                }}
              >
                {row &&
                  Object.values(row).map((data, index) => (
                    <TableCell key={index}>{data}</TableCell>
                  ))}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
