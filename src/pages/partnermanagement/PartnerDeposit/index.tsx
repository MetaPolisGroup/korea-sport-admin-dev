import React from "react";

import "./PartnerDeposit.scss";
import Components from "../../../components";
import { Button } from "antd";
import { COLUMNS } from "./columns";

const PartnerDeposit: React.FC = () => {
  const LIST_BUTTON = [
    {
      id: "btn1",
      title: "Excel",
      className: "",
      onAction: () => {},
    },
    {
      id: "btn2",
      title: "출금 신청 생성",
      className: "",
      onAction: () => {},
    },
    {
      id: "btn3",
      title: "승인 대기",
      className: "",
      onAction: () => {},
    },
    {
      id: "btn4",
      title: "취소된 내역",
      className: "",
      onAction: () => {},
    },
    {
      id: "btn5",
      title: "전체내역",
      className: "",
      onAction: () => {},
    },
    {
      id: "btn6",
      title: "선택 일괄 취소",
      className: "btn-red",
      onAction: () => {},
    },
    {
      id: "btn7",
      title: "선택 일괄 승인",
      className: "btn-green",
      onAction: () => {},
    },
  ];

  const renderListBtn = () => {
    return LIST_BUTTON?.map?.((item) => (
      <Button
        key={item?.id}
        className={item?.className}
        onClick={() => item?.onAction()}
      >
        {item?.title}
      </Button>
    ));
  };

  return (
    <div className="partner-deposit">
      <div className="partner-deposit__header">
        <h3>파트너 입금 관리</h3>
        <div className="box-filter">
          <div>
            <p>From</p>
            <Components.Input.DatePicker label="" name="from" />
          </div>
          <div>
            <p>To</p>
            <Components.Input.DatePicker label="" name="to" />
          </div>
        </div>
      </div>
      <div className="partner-deposit__content">
        <div className="box-btn">{renderListBtn()}</div>
        <div className="search">
          Search:
          <Components.Input.Text />
        </div>

        <div className="box-table">
          <Components.ListingTable
            rowSelection={{ type: "checkbox" }}
            datas={[]}
            columns={COLUMNS()}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerDeposit;
