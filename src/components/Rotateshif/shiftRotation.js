import React from "react";
import { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest ,postRequest} from "../../serverconfiguration/requestcomp";
import { createSvgIcon, shouldSkipGeneratingVar } from "@mui/material";
import { Button, Grid,FormControl,InputLabel } from "@mui/material";
import {PAYMBRANCHES, PAYMDEPARTMENT,} from "../../serverconfiguration/controllers";
import { REPORTS } from "../../serverconfiguration/controllers";
import { useNavigate } from "react-router-dom";
import JsonTable from "./jsoncomp";
import { decryptData } from "../Authentication/encryption";

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

const ShiftRotation = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  const [pndepartmentid,setPnDepartmentid] = useState([]);
  const [shiftcode,setShiftCode] = useState([]);
  const [groupid,setGroupid] = useState([]);
  const [display,setDisplay]=useState(false)
  useEffect(() => {
    postRequest(ServerConfig.url, REPORTS,{
        "query": "select e.pn_employeeid,e.employeecode,e.employee_full_name,p.pn_departmentid ,d.v_DepartmentName,eg.groupid,g.group_name,sm.shift_code from paym_employee e join paym_employee_profile1 p on e.pn_employeeid=p.pn_employeeid join paym_department d on p.pn_departmentid=d.pn_departmentid join  employee_group eg on e.EmployeeCode=eg.employee_code join Group_details g on eg.groupid=g.groupid join shift_month sm on e.EmployeeCode=pn_EmployeeCode where Month(sm.date)=Month(getdate()) and e.pn_BranchId="+decryptData(sessionStorage.getItem("branch"))
    }).then((e) => {
        console.log(e.data)
      setData(e.data);
    });
  }, []);

  function handonClick() {
    navigate("/ShiftRotation");
  }
  return (
    <div>
         <Grid item xs={3} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Department</InputLabel>
                    <select
                      name="pn_departmentid"
                      onChange={(e) => {
                        setPnDepartmentid(e.target.value);
                      }}
                      style={{ height: "40px", width: "300px", fontSize: "15px"}}
                      
                      >
                      <option>Select</option>
                      {data.map((e) => (
                        <option>{e.v_DepartmentName}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={3} sm={3} style={{marginTop:"20px"}}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Shiftcode</InputLabel>
                    <select
                      name="shift_code"
                      onChange={(e) => {
                        setShiftCode(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {data.map((e) => (
                        <option>{e.shift_code}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={3} sm={3} style={{marginTop:"20px"}}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Groupid</InputLabel>
                    <select
                      name="groupid"
                      onChange={(e) => {
                        setGroupid(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {data.map((e) => (
                        <option>{e.group_name}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={3} sm={3} style={{marginTop:"20px"}}>
                  <FormControl fullWidth>
                    {/* <InputLabel shrink>Groupid</InputLabel>
                    <select
                      name="groupid"
                      onChange={(e) => {
                        setGroupid(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {data.map((e) => (
                        <option>{e.groupid}</option>
                      ))}
                    </select> */}
                    <Button variant="contained" onClick={()=>{
                       console.log(pndepartmentid)
                       console.log(shiftcode)
                       console.log(groupid)
                       const d1=data.filter((e)=>e.v_DepartmentName==pndepartmentid && e.shift_code==shiftcode && e.group_name==groupid)
                       console.log(d1)
                      setData(d1)
                        setDisplay(true)
                    }}>Load</Button>
                  </FormControl>
                </Grid>



      {/* <JsonToTable json={data}/> */}
      {display?<JsonTable jsonData={data} url={ServerConfig.url + REPORTS} />:"No data loaded"}
      <Grid margin={5}>
        <Button variant="outlined" color="success" onClick={handonClick}>
          Add
          <PlusIcon />
        </Button>
      </Grid>
    </div>
  );
};

export default ShiftRotation;