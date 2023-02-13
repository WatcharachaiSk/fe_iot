import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

function SearchDate(props: any) {
  const { getDate, getDht, setDataFilter, dataFilter } = props;
  const [pickAll, setPickAll] = useState<string>("all");
  const [selected, setSelected] = useState<any>({
    filter: "all",
    value: "all",
  });

  useEffect(() => {
    let arrFilter: any[any];
    if (selected?.filter == "all") {
      arrFilter = getDht;
    } else if (selected?.filter == "date") {
      arrFilter = _.filter(getDht, (item) => {
        return selected?.value == moment(item.createdAt).format("DD/MM/YYYY");
      });
    }

    let arrLabelsItems: any = [];

    _.map(arrFilter, (item) => {
      arrLabelsItems.push({
        date: moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        datat: Number(item?.temperature),
        dataH: Number(item?.humidity),
      });
    });

    // console.log(arrFilter);
    // console.log(arrLabelsItems);
    setDataFilter(arrLabelsItems);
  }, [selected]);
  return (
    <>
      <div className="d-flex flex-wrap">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            className="d-inline mx-2 m-1"
            onClick={() => {
              setPickAll("all");
              setSelected({
                filter: "all",
                value: "all",
              });
            }}
            style={{
              color: pickAll == "all" ? "#fff" : "#000",
              borderColor: "#ced4da",
            }}
            variant={pickAll == "all" ? "secondary" : "outline-secondary"}
          >
            ค้นหาทั้งหมด
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Form.Select
            className="d-inline mx-2 m-1"
            aria-label="Default select example"
            // value={pickBuilding}
            onChange={(e) => {
              // setPickBuilding(e.target.value);
              setPickAll("0");

              if (e.target.value != "0") {
                setSelected({
                  filter: "date",
                  value: e.target.value,
                });
              } else {
                setSelected({
                  filter: "all",
                  value: "all",
                });
              }
            }}
          >
            <option value={"0"}>ค้นหาตามวัน</option>
            {_.map(getDate, (item: any, idx: number) => {
              return (
                <option key={idx} value={item}>
                  {item}
                </option>
              );
            })}
          </Form.Select>
        </div>
      </div>
    </>
  );
}

export default SearchDate;
