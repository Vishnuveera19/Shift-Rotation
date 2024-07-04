import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Table, TableBody, TableCell, TableRow, TableContainer, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Import ServerConfig and REPORTS if not already imported

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
}));

const Header = styled(CardContent)(({ theme }) => ({
  backgroundColor: blue[500],
  color: 'white',
  textAlign:'center'
}));

const ProfileCard = ({ selectedEmployeeId }) => {
  const [rolldata, setRolldata] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await postRequest(ServerConfig.url, REPORTS, {
       "query":  " SELECT   p.pn_employeeId,  p.pn_branchid, (SELECT TOP 1 BranchName FROM paym_Branch WHERE pn_BranchID = p.pn_branchid) AS BranchName,(SELECT TOP 1 v_divisionname  FROM paym_division  WHERE branchid = p.pn_branchid) AS division, (SELECT TOP 1 v_departmentname  FROM paym_department  WHERE pn_branchid = p.pn_branchid) AS department,(SELECT TOP 1 v_DesignationName FROM paym_designation WHERE pn_BranchID = p.pn_branchid) AS designation, (SELECT TOP 1 v_GradeName FROM paym_Grade WHERE BranchID = p.pn_branchid) AS grade, (SELECT TOP 1 v_ShiftName FROM paym_Shift WHERE pn_BranchID = p.pn_BranchID) AS shift, (SELECT TOP 1 v_CategoryName FROM paym_Category WHERE pn_BranchID = p.pn_BranchID) AS category, (SELECT TOP 1 v_JobStatusName FROM paym_JobStatus WHERE BranchID  = p.pn_BranchID) AS jobstatus, (SELECT TOP 1 father_name FROM paym_employee_profile1  WHERE pn_BranchID = p.pn_branchid) AS FatherName,(SELECT TOP 1 v_LevelName FROM paym_Level WHERE BranchID = p.pn_BranchID) AS level,  (SELECT TOP 1 employee_full_name  FROM paym_Employee WHERE pn_EmployeeID = p.pn_EmployeeID) AS employee_name,( select  Top 1 image from Employeeimage where employeecode=employeeCode ) as image ,(SELECT TOP 1 EmployeeCode  FROM paym_Employee  WHERE pn_EmployeeID = p.pn_EmployeeID) AS employee_code FROM paym_employee_profile1 p " });
        if (response && response.data) {
          setRolldata(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData()
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(rolldata);
  return (
    <div style={{ marginLeft: '250px', borderRadius: '50px' }}>
      <Container>
        <CustomCard>
          <Header>
            <Typography gutterBottom variant="h5" component="div" justifyContent={'center'}  >
            {
 rolldata.length > 0 && rolldata[0].employee_name}            
            </Typography>
          </Header>
          <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <label htmlFor="avatar-upload">
              <Avatar
                alt="Profile Picture"
              
                src={rolldata.length>0 && rolldata[0].image}
                sx={{ width: 150, height: 150, cursor: 'pointer' }}
               
              />
              {/* <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
               
              /> */}
              <span style={{ position: 'relative', top: -40, left: 60, backgroundColor: '#fff', borderRadius: '50%', padding: 5, cursor: 'pointer' }}>+</span>
            </label>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', marginLeft: 2 }}>
              <Table aria-label="profile details">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">EMP CODE</TableCell>
                    <TableCell>
                      {
                         rolldata.length > 0 && rolldata[0].employee_code}            

                      </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">BRANCH NAME</TableCell>
                    <TableCell>
                    {rolldata.length > 0 && rolldata[0].BranchName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">EMPLOYEEID</TableCell>
                    <TableCell>
                      {
                        rolldata.length > 0 && rolldata[0].pn_employeeId
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">FATHER NAME</TableCell>
                    <TableCell>
                      {
                        rolldata.length > 0 && rolldata[0].FatherName
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">DEPARTMENT</TableCell>
                    <TableCell>
                      {
                        rolldata.length > 0 && rolldata[0].department}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">DIVISION</TableCell>
                    <TableCell>
                    {
                        rolldata.length > 0 && rolldata[0].division}
                      </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">DESIGNATION</TableCell>
                    <TableCell>
                    {
                        rolldata.length > 0 && rolldata[0].designation}
                      </TableCell>
                      
                
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">GRADE</TableCell>
                    <TableCell>

                    {
                        rolldata.length > 0 && rolldata[0].grade}
                      </TableCell>
                      
                
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">JOBSTATUS</TableCell>
                    <TableCell>
                    {
                        rolldata.length > 0 && rolldata[0].jobstatus}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">LEVEL</TableCell>
                    <TableCell>
                    {
                        rolldata.length > 0 && rolldata[0].level}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">SHIFT</TableCell>
                    <TableCell>
                    {
                        rolldata.length > 0 && rolldata[0].shift}
                    </TableCell>
                  
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">CATEGORY</TableCell>
                    <TableCell>
                    {
                        rolldata.length > 0 && rolldata[0].category}
                    </TableCell>
                    
                  </TableRow>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CustomCard>
      </Container>
      
    </div>
  );
};

export default ProfileCard;