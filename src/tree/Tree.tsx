import { useMemo, useState } from "react";
import jsons from "../config/index_json";
import Lottie from "react-lottie";
import _ from "lodash";
import axios from "axios";
import configAxios from "../axios/configAxios";
import { API } from "../axios/swr/endpoint";
import moment from "moment";
import { Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { IoWaterSharp } from "react-icons/io5";
import { GridColDef } from "@mui/x-data-grid";
function Tree() {
  const [getDht, serGetDht] = useState<any>();
  const [getDhtPop, serGetDhtPop] = useState<any>();
  const [getBtn, serGetBtn] = useState<any>();
  const [getBtnPop, serGetBtnPop] = useState<any>();

  const [reset, setReset] = useState<boolean>(true);

  const [statusW, setStatusW] = useState<any>();

  const [rowItems, setRowItems] = useState<any>();
  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getDht));
      const resGetBtn = await axios(configAxios("get", API.getBtnAll));

      const resGetBtnLast = await axios(
        configAxios("get", API.getBtnAll + "?order=DESC")
      );
      serGetDht(res.data);
      serGetDhtPop(res.data.pop());
      serGetBtn(resGetBtn.data);

      serGetBtnPop(resGetBtn.data.pop());
      //  console.log(resGetBtn.data.pop());
      setStatusW(resGetBtn.data.pop().status);
      let arrG_row: any = [];
      {
        _.map(resGetBtnLast.data, (item) => {
          arrG_row.push({
            id: item?.btm_id,
            status: item?.status,
            date: moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
          });
        });
      }
      // console.log(arrG_row);
      setRowItems(arrG_row);
    } catch (error) {}
  }, [reset]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: jsons.water_loading,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 90 },
    {
      field: "status",
      headerName: "status",
      width: 150,
    },
    {
      field: "date",
      headerName: "date",
      flex: 1,
      width: 200,
    },
  ];

  const onSw = async () => {
    try {
      if (getBtnPop.status == "off") {
        const res = await axios(
          configAxios("get", API.create_btn + "?status=on")
        );
        setReset(!reset);
        // setStatusW("on");
      }
    } catch (error) {}
  };
  const offSw = async () => {
    try {
      if (getBtnPop.status == "on") {
        const res = await axios(
          configAxios("get", API.create_btn + "?status=off")
        );
        // setStatusW("off");
        setReset(!reset);
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="mt-4"></div>
      {getDhtPop && (
        <div>
          <h4 className="d-flex justify-content-center">
            อุณหภูมิ {getDhtPop.temperature} ความชื้น {getDhtPop.humidity}{" "}
            จัดเก็บล่าสุด เวลา{" "}
            {moment(getDhtPop.createdAt).format("DD/MM/YYYY hh:mm:ss")}
          </h4>
          <div className="mt-3 d-flex justify-content-center">
            <h4>Sw น้ำตอนนี้ </h4>
            <h4
              style={{ color: getBtnPop.status == "on" ? "green" : "red" }}
              className="mx-3"
            >
              {" "}
              {getBtnPop.status}
            </h4>
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <Button
              onClick={() => {
                onSw();
              }}
              style={{ width: 120, height: 50 }}
              variant="outline-success"
            >
              <IoWaterSharp color="#74ccf4" size={20} />{" "}
              <span style={{ fontSize: 20 }}>เปิดน้ำ</span>
            </Button>
            <div className="mx-3"></div>
            {/*  */}
            <Button
              onClick={() => {
                offSw();
              }}
              style={{ width: 120, height: 50 }}
              variant="outline-danger"
            >
              <IoWaterSharp color="red" size={20} />{" "}
              <span style={{ fontSize: 20 }}> ปิดน้ำ</span>
            </Button>
          </div>
          <div>
            {getBtnPop.status == "on" && (
              <Lottie style={{ width: "50%" }} options={defaultOptions} />
            )}
          </div>
          <div className="mt-3" style={{ height: "50vh", width: "100%" }}>
            <h5>การกดน้ำ Sw (ย้อนหลัง)</h5>
            <DataGrid rows={rowItems} columns={columns} />
          </div>
        </div>
      )}

      {/* <Lottie options={defaultOptions} /> */}
    </>
  );
}

export default Tree;
