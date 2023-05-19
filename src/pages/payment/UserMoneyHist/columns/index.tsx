import { Button, FormInstance, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import Box from "../../../../components/Box";
import { IUser } from "../../../../features/auth";
import { PopupRef } from "../../../../components/Popup";
import Components from "../../../../components";
import Utils from "../../../../utils";
import { formatDateTime } from "../../../../components/Input/DatePicker";

const getColumns = (form: FormInstance<any>, id: string): ColumnsType<any> => {
  return [
    {
      title: "번호",
      align: "center",
      width: 100,
      render: (_, data, index) => index + 1,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.created_at - b.created_at,
    },
    {
      title: "소속",
      align: "left",
      width: 150,
      dataIndex: "type",
      key: "type",
      render: (_, data) => {
        return (
          <Box<{ partner_id: string }>
            id={data.type.account_id}
            collectionName="users"
            filters={[["id", "==", data.type.account_id]]}
            render={(item) => {
              return <div>{item?.partner_id}</div>;
            }}
          />
        );
      },
    },
    {
      title: "아이디",
      align: "left",
      width: 150,
      dataIndex: "type",
      key: "type",
      render: (_, data) => {
        const popupRef = React.createRef<PopupRef>();
        return (
          <Components.Popup
            ref={popupRef}
            footer
            width={1200}
            title={"유저 " + data.type?.account_id}
            content={
              <Components.Member
                user={data?.type?.account_id as IUser}
                popupRef={popupRef}
              />
            }
            selector={
              <Tag
                style={{ cursor: "pointer" }}
                onClick={() => popupRef.current?.open()}
              >
                {data?.type?.account_id}
              </Tag>
            }
          />
        );
      },
    },
    {
      title: "구분",
      dataIndex: "type",
      key: "type",
      align: "center",
      width: 200,
      render: (_, data) => {
        return <p>{data?.type?.division}</p>;
      },
    },
    {
      title: "이전금액",
      dataIndex: "before_amount",
      key: "before_amount",
      align: "center",
      width: 200,
      render: (before_amount) => {
        return <p>{Utils.convertCurrencyWithCommas(before_amount)}</p>;
      },
    },
    {
      title: "변동금액",
      dataIndex: "transaction_amount",
      key: "transaction_amount",
      align: "center",
      width: 150,
      render: (transaction_amount) => (
        <p>{Utils.convertCurrencyWithCommas(transaction_amount)}</p>
      ),
    },
    {
      title: "이후금액",
      dataIndex: "after_amount",
      key: "after_amount",
      align: "center",
      width: 150,
      render: (after_amount) => (
        <p>{Utils.convertCurrencyWithCommas(after_amount)}</p>
      ),
    },
    {
      title: "비고",
      dataIndex: "note",
      key: "note",
      align: "center",
      width: 150,
      render: (note) => <p>{note}</p>,
    },
    {
      title: "생성일",
      dataIndex: "created_at",
      key: "created_at",
      align: "left",
      width: 200,
      render: (created_at) => {
        const date = dayjs(created_at).format(formatDateTime);
        return <span>{date}</span>;
      },
    },
  ];
};
export { getColumns };
