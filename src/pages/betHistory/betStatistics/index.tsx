import React, { useRef, useState, useEffect } from "react";

import dayjs from "dayjs";
import "./BetStatistics.scss";
import { Button } from "antd";
import { COLUMNS } from "./columns";

import Components from "../../../components";
import { queryBuilderFunc } from "../../../service/queryFunction";

const BetStatistics: React.FC = () => {
  const [dataTable, setDataTable] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>();

  const dateFillter = useRef<any>({
    from: dayjs().add(-1, "day"),
    to: dayjs(),
  });

  const LIST_BTN = [
    {
      id: "btn1",
      title: "Excel",
      onAction: () => {},
    },
  ];

  const getBetSport = async () => {
    const dateFrom = dayjs(dateFillter?.current?.from).unix() * 1000;
    const dateTo = dayjs(dateFillter?.current?.to).unix() * 1000;

    const responseBets: any = await queryBuilderFunc("bets", [
      ["created_at", ">=", dateFrom],
      ["created_at", "<=", dateTo],
    ]);

    let bet = 0;
    let win = 0;

    responseBets?.map?.((item: any) => {
      bet += item?.amount;

      if (item?.status === "Win") {
        win += item?.winning_amount;
      }
    });

    const betWin =
      bet > win ? (
        <span className="blue">{(bet - win).toLocaleString("en-US")}</span>
      ) : (
        <span className="red">{(bet - win).toLocaleString("en-US")}</span>
      );

    const sport = {
      name: "스포츠",
      bet: bet.toLocaleString("en-US"),
      win: win.toLocaleString("en-US"),
      betWin,
    };

    setDataTable([sport]);
  };

  useEffect(() => {
    getBetSport();
  }, [refresh]);

  const renderListBtn = () => {
    return (
      <div className="box-btn">
        {LIST_BTN?.map?.((btn) => (
          <Button key={btn?.id} onClick={() => btn?.onAction()}>
            {btn?.title}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="bet-statistics">
      <div className="bet-statistics__header">
        <h3>베팅 집계</h3>

        <div className="box-filter">
          <div>
            <p>From</p>
            <Components.Input.DatePicker
              label=""
              name="from"
              defaultValue={dayjs(dateFillter?.current?.from) ?? ""}
              onChange={(date) => {
                dateFillter.current.from = date;
                setRefresh(!refresh);
              }}
            />
          </div>
          <div>
            <p>To</p>
            <Components.Input.DatePicker
              label=""
              name="to"
              defaultValue={dayjs(dateFillter?.current?.to) ?? ""}
              onChange={(date) => {
                dateFillter.current.to = date;
                setRefresh(!refresh);
              }}
            />
          </div>
        </div>
      </div>

      <div className="bet-statistics__content">
        <div className="header">
          {renderListBtn()}
          <div>
            search:
            <Components.Input.Text />
          </div>
        </div>

        <Components.ListingTable
          columns={COLUMNS()}
          datas={dataTable}
          pagination
          srollX="none"
        />
      </div>
    </div>
  );
};

export default BetStatistics;
