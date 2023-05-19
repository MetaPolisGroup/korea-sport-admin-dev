import { Row } from "antd";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { getAllDocuments } from "../../../service/queryFunction";

interface BreadCrumb {
  title: string;
  content: string;
  path: string;
  color: string;
  modeShow: string;
  field: string;
}

const BreadCrumb = () => {
  const [listBreadCrumb, setListBreadCrumb] = useState<BreadCrumb[]>(
    listBreadCrumbDefault
  );

  const date = new Date();
  const dateNow = `${date?.getFullYear()}-${date?.getMonth()}-${date?.getDate()}`;

  useEffect(() => {
    getAllDocuments("preferences").then((dataReturn) => {
      const calculations = dataReturn?.[0]?.calculations;

      if (calculations === undefined) {
        return null;
      }

      const _dataFill = listBreadCrumbDefault?.map((value) => {
        if (value?.modeShow === "count")
          return {
            ...value,
            title: `${calculations?.[value?.field]?.value.toLocaleString(
              "en-US"
            )}(${calculations?.[value?.field]?.count})`,
          };

        if (value?.modeShow === "user")
          return {
            ...value,
            title: `${calculations?.[value?.field]?.new}/${calculations?.[value?.field]?.all
              }`,
          };

        return {
          ...value,
          title: calculations?.[value?.field as string].toLocaleString("en-US"),
        };
      });

      setListBreadCrumb(_dataFill);
    });
  }, []);

  return (
    <Row style={{ margin: "20px 24px", gap: 10 }} justify="end">
      <div className="nav-card">
        <span style={{ color: "#8898aa", fontWeight: "bold" }}>{dateNow}</span>
        <span style={{ color: "#8898aa" }}>Today</span>
      </div>

      {listBreadCrumb?.map((i, idx) => (
        <div className="nav-card" key={idx}>
          {i.path === "#" ? (
            <span style={{ color: i.color, fontWeight: "bold" }}>
              {i.title}
            </span>
          ) : (
            <NavLink style={{ color: i.color, fontWeight: "bold" }} to={i.path}>
              {i.title}
            </NavLink>
          )}
          <span style={{ color: "#8898aa" }}>{i.content}</span>
        </div>
      ))}
    </Row>
  );
};

const listBreadCrumbDefault = [
  {
    title: "0",
    content: "파트너 보유 머니",
    path: "#",
    color: "#707cd2",
    field: "balance_partners",
    modeShow: "normal",
  },
  {
    title: "0(0)",
    content: "오늘 총입금",
    path: "/payment-deposit",
    color: "#2cd07e",
    field: "total_deposit_today",
    modeShow: "count",
  },
  {
    title: "0(0)",
    content: "오늘 총출금",
    path: "/payment-deposit",
    color: "red",
    field: "total_withdraw_today",
    modeShow: "count",
  },
  {
    title: "0",
    content: "오늘 정산",
    path: "/revenue",
    color: "#2cabe3",
    field: "total_settlement_today",
    modeShow: "count",
  },
  {
    title: "0",
    content: "유저 보유 머니",
    path: "#",
    color: "#8898aa",
    field: "balance_users",
    modeShow: "normal",
  },
  {
    title: "0",
    content: "유저 보유 포인트",
    path: "#",
    color: "#ffc36d",
    field: "point_users",
    modeShow: "normal",
  },
  {
    title: "0(0)",
    content: "현재 배팅 스포츠",
    path: "/sport-match-list",
    color: "#2cabe3",
    field: "prematch_bet",
    modeShow: "count",
  },
  {
    title: "0(0)",
    content: "현재 배팅 실시간",
    path: "/sport-live",
    color: "#ffc36d",
    field: "live_bet",
    modeShow: "count",
  },
  {
    title: "0(0)",
    content: "오늘 총베팅",
    path: "/sport-bet-list",
    color: "#2cd07e",
    field: "total_bet",
    modeShow: "count",
  },
  {
    title: "0",
    content: "당첨후 차액",
    path: "/sport-bet-list",
    color: "#2cabe3",
    field: "money_waiting",
    modeShow: "normal",
  },
  {
    title: "0/0",
    content: "당첨후 차액",
    path: "/member-list",
    color: "#707cd2",
    field: "user_new_all",
    modeShow: "user",
  },
  {
    title: "0",
    content: "당첨후 차액",
    path: "/#",
    color: "#8898aa",
    field: "user_online",
    modeShow: "normal",
  },
];

export default React.memo(BreadCrumb);
