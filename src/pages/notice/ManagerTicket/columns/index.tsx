import { CloseOutlined } from "@ant-design/icons";
import { FormInstance, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import { IGetColumnsTicket } from "..";
import { formatDateTime } from "../../../../components/Input/DatePicker";
import PopupMessage from "../PopupMessage";
import "./columns.css";

const getColumns = (
  form: FormInstance<any>,
  id: string,
  message: IGetColumnsTicket[],
  setMessage: React.Dispatch<React.SetStateAction<IGetColumnsTicket[]>>
): ColumnsType<IGetColumnsTicket> => {

  return [
    {
      title: "제목",
      align: "left",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "상태",
      align: "left",
      dataIndex: "status",
      key: "status",
      width: 300,
      render: (status) => {
        let color;
        let text;
        switch (status) {
          case "Waiting for process":
            color = "yellow";
            text = "프로세스를 기다리고 있습니다";
            break;
          case "Closed":
            color = "#f50";
            text = "닫은";
            break;
          default:
            break;
        }
        return <Tag color={color}>{text ?? "--"}</Tag>;
      },
    },
    {
      title: "유형",
      align: "left",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "사용자",
      dataIndex: "user_id",
      key: "user_id",
      align: "left",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      align: "left",
      render: (time) => <p>{dayjs(time).format(formatDateTime)}</p>,
    },
    {
      title: "양",
      dataIndex: "amount",
      key: "amount",
      align: "left",
      render: (amount) => {
        return <p>{amount ?? "Emty"}</p>;
      },
    },
    {
      fixed: "right",
      render: (_, data, idx) => {

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {data.type === "Support" && data.status !== "Closed" ? (
              <PopupMessage data={data} form={form} id={id} />
            ) : (
              <div style={{ color: "red" }}>
                <CloseOutlined />
              </div>
            )}
          </div>
        );
      },
    },
  ];
};

export { getColumns };
