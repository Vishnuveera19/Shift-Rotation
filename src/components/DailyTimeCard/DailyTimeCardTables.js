import React from "react";
import { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest } from "../../serverconfiguration/requestcomp";
import { createSvgIcon } from "@mui/material";
import { Button, Grid } from "@mui/material";
import {
  DAILYTIMECARD,
  EARNDEDUCT,
} from "../../serverconfiguration/controllers";
import { useNavigate } from "react-router-dom";
import JsonTable from "./jsoncomp";

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

const DailyTimeCardTables = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  useEffect(() => {
    getRequest(ServerConfig.url, DAILYTIMECARD)
      .then((e) => {
        setData(e.data);
      })
      .catch((e) => navigate("/dailytimecardform"));
  }, []);

  function handonClick() {
    navigate("/dailytimecardform");
  }

  return (
    <div>
      {console.log(data)}
      {/* <JsonToTable json={data} /> */}
      <div>
        <Button
          variant="outlined"
          color="success"
          sx={{ textAlign: "right" }}
          onClick={handonClick}>
          Add
          <PlusIcon />
        </Button>
      </div>
      <div>
        <JsonTable jsonData={data} url={ServerConfig.url + DAILYTIMECARD} />
        <Grid margin={5}></Grid>
      </div>
    </div>
  );
};

export default DailyTimeCardTables;
