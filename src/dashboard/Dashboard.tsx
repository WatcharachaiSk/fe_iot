import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import configAxios from "../axios/configAxios";
import moment from "moment";
import { API } from "../axios/swr/endpoint";
import _ from "lodash";
import SearchDate from "../components/sidebar/SearchDate";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [getDht, setGetDht] = useState();
  const [dataFilter, setDataFilter] = useState<any>(undefined);
  const [labels, setLabelsItems] = useState<any>();
  const [dateT, setDateT] = useState();
  const [dateH, setDateH] = useState();

  const [getDate, setGetDate] = useState<any[]>();
  //  console.log(getDht);
  // console.log("labelsItems = ", labels);
  // console.log("dateT = ", dateT);
  // console.log("dateT = ", dateH);
  useMemo(async () => {
    try {
      const res = await axios(configAxios("get", API.getDht));

      let arrLabelsItems: any = [],
        arrDatat: any = [],
        arrDataH: any = [];

      _.map(res.data, (item) => {
        arrLabelsItems.push(
          moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")
        );
        arrDatat.push(Number(item?.temperature));
        arrDataH.push(Number(item?.humidity));
      });

      let arrDate: any[] = [],
        arrMapDate: any[] = [];
      _.map(res.data, (item, i: any) => {
        arrDate.push(moment(item.createdAt).format("DD/MM/YYYY"));
      });
      arrMapDate = Array.from(new Set(arrDate));
      setGetDate(arrMapDate);

      // console.log("arrLabelsItems = ", arrLabelsItems);
      // console.log("arrDatat = ", arrDatat);
      setLabelsItems(arrLabelsItems);
      setDateT(arrDatat);
      setDateH(arrDataH);
      setGetDht(res.data);
    } catch (error) {}
  }, []);

  const [dateTA, setDateTA] = useState<any>();
  const [dateHA, setDateHA] = useState<any>();
  useEffect(() => {
    if (dataFilter) {
      let daT = 0,
        daH = 0;
      _.map(dataFilter, (item) => {
        daT = daT + item.datat;
        daH = daH + item.dataH;
      });
      // console.log(daT / dataFilter.length);
      setDateTA(daT / dataFilter.length);
      setDateHA(daH / dataFilter.length);
    }
  }, [dataFilter]);

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "อุณหภูมิ/ความชื้น",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: dataFilter
      ? _.map(dataFilter, (item) => {
          return item.date;
        })
      : labels,
    datasets: [
      {
        label: "อุณหภูมิ",
        data: dataFilter
          ? _.map(dataFilter, (item) => {
              return item.datat;
            })
          : dateT,

        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
      {
        label: "ความชื้น",
        data: dataFilter
          ? _.map(dataFilter, (item) => {
              return item.dataH;
            })
          : dateH,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return (
    <>
      <div>
        <h3 className="my-3 d-flex justify-content-center">Dashboard</h3>
      </div>

      <div>
        {getDht && (
          <>
            <div className="d-flex justify-content-end flex-wrap mx-2selected">
              <SearchDate
                getDate={getDate}
                getDht={getDht}
                dataFilter={dataFilter}
                setDataFilter={setDataFilter}
              />
            </div>
            {dataFilter && dateTA && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ค่าเฉลี่ยอุณหภูมิ <h4 className="mx-2">{dateTA.toFixed(2)}</h4>
                ค่าเฉลี่ยความชื้น <h4 className="mx-2">{dateHA.toFixed(2)}</h4>
              </div>
            )}

            <Line options={options} data={data} />
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
