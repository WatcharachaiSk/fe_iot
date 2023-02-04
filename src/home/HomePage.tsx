import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridValueGetterParams } from "@mui/x-data-grid/models";
import { useState, useEffect, useMemo } from "react";
import SidebarApp from "../components/sidebar/SidebarApp";
import axios from "axios";
import configAxios from "../axios/configAxios";
import { API } from "../axios/swr/endpoint";
import _ from "lodash";
import moment from "moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HomePage() {
  const [getDht, serGetDht] = useState();
  const [rowItems, setRowItems] = useState();
  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getDht));
      serGetDht(res.data);

      let arrG_row: any = [];
      {
        _.map(res.data, (item) => {
          arrG_row.push({
            id: item?.dht_id,
            temperature: item?.temperature,
            humidity: item?.humidity,
            date: moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
          });
        });
      }
      // console.log(arrG_row);
      setRowItems(arrG_row);
    } catch (error) {}
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 90 },
    {
      field: "temperature",
      headerName: "temperature",
      width: 150,
    },
    {
      field: "humidity",
      headerName: "humidity",
      width: 150,
    },
    {
      field: "date",
      headerName: "date",
      flex: 1,
      width: 200,
    },
  ];

  const labelsBar = [
    "รอหมายเลขครุภัณฑ์",
    "ปกติ",
    "ชำรุด",
    "รอจำหน่าย",
    "จำนหน่ายแล้ว",
  ];
  // const dataBar = {
  //   labels: labelsBar,
  //   datasets: [
  //     {
  //       label: "สถานะครุภัณฑ์",
  //       data: sumStatus_Item,
  //       backgroundColor: [
  //         colors.statusColor4,
  //         colors.statusColor1aa,
  //         colors.statusColor0ff,
  //         colors.statusColor2,
  //         colors.statusColor3,
  //       ],
  //     },
  //   ],
  // };

  return (
    <div>
      {/* <Button variant="outlined">Outlined</Button> */}
      <div className="my-3 d-flex justify-content-center">
        <h3>ข้อมูล อุณหภูมิ และ ความชื้น</h3>
      </div>
      <div style={{ height: "90vh", width: "100%" }}>
        {getDht && rowItems && <DataGrid rows={rowItems} columns={columns} />}
      </div>
    </div>
  );
}

export default HomePage;
