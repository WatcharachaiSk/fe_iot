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
import { useMemo, useState } from "react";
import axios from "axios";
import configAxios from "../axios/configAxios";
import moment from "moment";
import { API } from "../axios/swr/endpoint";
import _ from "lodash";
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

  const [labels, setLabelsItems] = useState<any>();
  const [dateT, setDateT] = useState();
  const [dateH, setDateH] = useState();
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

      // console.log("arrLabelsItems = ", arrLabelsItems);
      // console.log("arrDatat = ", arrDatat);
      setLabelsItems(arrLabelsItems);
      setDateT(arrDatat);
      setDateH(arrDataH);
      setGetDht(res.data);
    } catch (error) {}
  }, []);

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
    labels,
    datasets: [
      {
        label: "อุณหภูมิ",
        data: dateT,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "ความชื้น",
        data: dateH,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return (
    <>
      <div>
        <h3 className="my-3 d-flex justify-content-center">Dashboard</h3>
      </div>
      <div>{getDht && <Line options={options} data={data} />}</div>
    </>
  );
}

export default Dashboard;
