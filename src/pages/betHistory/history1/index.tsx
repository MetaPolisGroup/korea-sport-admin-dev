import React from "react";

import "./history1.scss";
import { Button } from "antd";
import Components from "../../../components";
import { COLUMNS, SELECT_OPTION } from "./constants";

const History1: React.FC = () => {
  const LIST_BTN = [
    {
      id: "btn1",
      title: "Excel",
      onAction: () => {},
    },
    {
      id: "btn2",
      title: "정산대기",
      onAction: () => {},
    },
    {
      id: "btn3",
      title: "당첨",
      onAction: () => {},
    },
    {
      id: "btn4",
      title: "낙첨",
      onAction: () => {},
    },
    {
      id: "btn5",
      title: "정산완료",
      onAction: () => {},
    },
    {
      id: "btn6",
      title: "수동처리",
      onAction: () => {},
    },
  ];

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
    <div className="bh-1">
      <div className="bh-1__header">
        <h3>미니게임 베팅</h3>

        <div className="box-filter">
          <div>
            <p>From</p>
            <Components.Input.DatePicker label="" name="from" />
          </div>
          <div>
            <p>To</p>
            <Components.Input.DatePicker label="" name="to" />
          </div>
          <div>
            <p>게임선택</p>
            <Components.Input.Select
              initialValue={1}
              defaultValue="전체"
              data={SELECT_OPTION}
              label=""
            />
          </div>
        </div>
      </div>

      <div className="bh-1__content">
        <div className="header">
          {renderListBtn()}
          <div>
            search:
            <Components.Input.Text />
          </div>
        </div>

        <Components.ListingTable columns={COLUMNS()} datas={[]} pagination />
      </div>
    </div>
  );
};

export default History1;
