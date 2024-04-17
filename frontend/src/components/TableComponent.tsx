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

interface TableComponentProps<T extends object> {
  list: T[] | undefined; // Массив объектов типа T
  setState: React.Dispatch<React.SetStateAction<T | undefined>>; // Функция для обновления состояния
}

const TableComponent = <T extends object>({
  list,
  setState,
}: TableComponentProps<T>) => {
  // Если list пуст или не определен, возвращаем null
  if (!list || list.length === 0) return null;

  // Определение заголовков таблицы по первому элементу массива
  const [firstItem] = list;
  const headers = Object.keys(firstItem);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Table">
        <TableHead>
          <TableRow className="bg-black">
            {headers.map((header) => (
              <StyledTableCell key={header}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, index) => (
            <StyledTableRow
              key={index}
              className="cursor-pointer"
              onClick={() => setState(row)}
            >
              {Object.values(row).map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
