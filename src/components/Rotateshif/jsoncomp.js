import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  TableCell,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Checkbox,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { postRequest, putRequest } from "../../serverconfiguration/requestcomp";
import { SAVE } from "../../serverconfiguration/controllers";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { decryptData } from "../Authentication/encryption";
import { json } from "react-router-dom";
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const JsonTable = ({ jsonData, url }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Select all rows by default when jsonData changes
  useEffect(() => {
    if (jsonData && jsonData.length > 0) {
      setSelectedRows(jsonData.slice(0)); // Copy array to avoid mutation
    }
  }, [jsonData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  if (!jsonData) {
    return <Typography>No JSON data provided.</Typography>;
  }

  const handleCheckboxChange = (row) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [...selectedRows];

    if (selectedIndex === -1) {
      newSelected.push(row);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (row) => selectedRows.indexOf(row) !== -1;

  const handleRotateshift = () => {
    const confirmed = window.confirm("Are you sure you want to Rotateshift?");
    if (confirmed) {

         console.log(jsonData)
         console.log(decryptData(sessionStorage.getItem("company")))
         console.log(decryptData(sessionStorage.getItem("branch")))
         jsonData.map((e)=>{
            postRequest(ServerConfig.url,SAVE,{
                    "query": `EXEC [dbo].[RotateEmployeeShift]@pn_companyid = ${decryptData(sessionStorage.getItem("company"))},@pn_branchid = ${decryptData(sessionStorage.getItem("branch"))},@pn_employeecode = ${e.employeecode}`
            
                  }
                  )
                   
         })
    //   postRequest(ServerConfig.url,SAVE,{
    //     "query": "EXEC [dbo].[RotateEmployeeShift]@pn_companyid = 1,@pn_branchid = 1,@pn_employeecode = 'EMP001'"

    //   }
    //   )
      
    } else {
      alert("Rotateshift operation cancelled");
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={5} style={{ marginRight: '40px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRotateshift}
          disabled={selectedRows.length === 0}
          sx={{ fontSize: '1rem', padding: '8px 15px' }} 
        >
          Rotate Shift
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
        <Table size="xxlarge">
          <TableHead>
            <TableRow>
              {Object.keys(jsonData[0]).map((header) => (
                <StyledTableCell key={header}>
                  {header.split(/paym|pn/)}
                </StyledTableCell>
              ))}
              <StyledTableCell>Selection</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <StyledTableCell
                      key={`${rowIndex}-${cellIndex}`}
                      align="right"
                    >
                      {cell}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleCheckboxChange(row)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={jsonData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default JsonTable;
