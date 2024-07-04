import React, { useEffect, useState } from 'react';
import { AGGREGATES } from '../../serverconfiguration/controllers';
import { getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box
} from '@mui/material';

function Reports() {
  const navigate = useNavigate();
  const [aggregates, setAggregates] = useState({
    PreviousMonthResults: [],
    CurrentMonthResults: [],
    PreviousMonthWorkingHours: [],
    CurrentMonthWorkingHours: []
  });

  useEffect(() => {
    async function getData() {
      const response = await getRequest(ServerConfig.url, AGGREGATES);
      setAggregates(response.data);
    }
    getData();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Monthly Aggregates Report
      </Typography>

      {Object.keys(aggregates).map((key, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {aggregates[key].length > 0 && Object.keys(aggregates[key][0]).map((col, idx) => (
                    <TableCell key={idx}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {aggregates[key].map((row, idx) => (
                  <TableRow key={idx}>
                    {Object.keys(row).map((col, idy) => (
                      <TableCell key={idy}>{row[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
}

export default Reports;