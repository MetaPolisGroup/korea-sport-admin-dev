import { Button, Form, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import bettingApi, {
  IBettingElement,
  IResponseBet,
} from "../../../../api/bettingApi";
import Input from "../../../../components/Input";
import { formatDateTime } from "../../../../components/Input/DatePicker";
import { PopupConfirm, PopupRef } from "../../../../components/Popup";
import Utils from "../../../../utils";

const getColumns = (): ColumnsType<IBettingElement> => {
  return [
    {
      title: "번호",
      width: 100,
      align: "center",
      render: (_, data, index) => index + 1,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.created_at - b.created_at,
    },
    {
      title: "문의자",
      width: 200,
      align: "left",
      render: (_, data) => (
        <p>{dayjs(Number(data.time) * 1000).format(formatDateTime)}</p>
      ),
    },
    {
      title: "문의",
      width: 200,
      align: "left",
      dataIndex: "title",
      key: "title",
      render: (_, data) => <p>{data.league}</p>,
    },
    {
      title: "답변",
      width: 200,
      align: "center",
      render: (_, data) => <p>{data.home_team}</p>,
    },
    {
      title: "상태",
      width: 200,
      align: "center",
      render: (_, data) => <p>{data.away_team}</p>,
    },
    {
      title: "받은날짜",
      width: 200,
      align: "center",
      render: (_, data) => <p>{data.odd_type}</p>,
    },
    {
      title: "설정",
      width: 200,
      align: "center",
      render: (_, data) => <p>{data.odd.team}</p>,
    },
  ];
};
export { getColumns };
