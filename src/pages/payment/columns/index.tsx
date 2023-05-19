import {
  CheckCircleTwoTone,
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, FormInstance, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import paymentApi, { IDepositData } from "../../../api/payment";
import Components from "../../../components";
import Box from "../../../components/Box";
import { formatDateTime } from "../../../components/Input/DatePicker";
import { PopupConfirm, PopupRef } from "../../../components/Popup";
import { IUser } from "../../../features/auth";
import Utils from "../../../utils";

const getColumns = (
  form: FormInstance<any>,
  id: string
): ColumnsType<IDepositData> => {
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
      dataIndex: "partner_id",
      key: "partner_id",
      render: (_, data) => {
        return (
          <Box<{ partner_id: string }>
            id={data.user_id}
            collectionName="users"
            filters={[["id", "==", data.user_id]]}
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
      dataIndex: "user_id",
      key: "user_id",
      render: (user_id) => {
        return (
          <Box<IUser>
            id={user_id}
            collectionName="users"
            filters={[["id", "==", user_id]]}
            render={(item) => {
              const popupRef = React.createRef<PopupRef>()
              return <Components.Popup
                ref={popupRef}
                footer
                width={1200}
                title={'유저 ' + item?.id}
                content={<Components.Member user={item as IUser} popupRef={popupRef} />}
                selector={<Tag style={{ cursor: 'pointer' }} onClick={() => popupRef.current?.open()}>{item?.id}</Tag>}
              />
            }}
          />
        );
      },
    },
    {
      title: "별명",
      dataIndex: "nickname",
      key: "nickname",
      align: "center",
      width: 200,
      render: (_, data) => {
        return (
          <Box<{ nickname: string }>
            id={data.user_id}
            collectionName="users"
            filters={[["id", "==", data.user_id]]}
            render={(item) => {
              return <div>{item?.nickname}</div>;
            }}
          />
        );
      },
    },
    {
      title: "예금주",
      dataIndex: "account_holder",
      key: "account_holder",
      align: "center",
      width: 200,
      render: (_, data) => {
        return (
          <Box<{ bank: { account_holder: string } }>
            id={data.user_id}
            collectionName="users"
            filters={[["id", "==", data.user_id]]}
            render={(item) => {
              return <div>{item?.bank.account_holder}</div>;
            }}
          />
        );
      },
    },
    {
      title: "보유머니",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      width: 150,
      render: (_, data) => {
        return (
          <Box<{ balance: string }>
            id={data.user_id}
            collectionName="users"
            filters={[["id", "==", data.user_id]]}
            render={(item) => {
              return (
                <div>{Utils.convertCurrencyWithCommas(item?.balance)}</div>
              );
            }}
          />
        );
      },
    },
    {
      title: "누적입금",
      dataIndex: "cumulative_deposit",
      key: "cumulative_deposit",
      align: "center",
      width: 150,
      render: (_, data) => {
        return (
          <Box<{ cumulative_deposit: string }>
            id={data.user_id}
            collectionName="users"
            filters={[["id", "==", data.user_id]]}
            render={(item) => {
              return (
                <div>
                  {Utils.convertCurrencyWithCommas(item?.cumulative_deposit)}
                </div>
              );
            }}
          />
        );
      },
    },
    {
      title: "누적출금",
      dataIndex: "cumulative_withdraw",
      key: "cumulative_withdraw",
      align: "center",
      width: 150,
      render: (_, data) => {
        return (
          <Box<{ cumulative_withdraw: string }>
            id={data.user_id}
            collectionName="users"
            filters={[["id", "==", data.user_id]]}
            render={(item) => {
              return (
                <div>
                  {Utils.convertCurrencyWithCommas(item?.cumulative_withdraw)}
                </div>
              );
            }}
          />
        );
      },
    },
    {
      title: "누적정산",
      dataIndex: "cumulative_settlement",
      key: "cumulative_settlement",
      align: "center",
      width: 200,
      render: (_, data) => {
        return (
          <Box<{ cumulative_settlement: string }>
            id={data.user_id}
            collectionName="users"
            filters={[["id", "==", data.user_id]]}
            render={(item) => {
              return (
                <div>
                  {Utils.convertCurrencyWithCommas(item?.cumulative_settlement)}
                </div>
              );
            }}
          />
        );
      },
    },
    {
      title: "신청금액",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: 150,
      render: (item) => <div>{Utils.convertCurrencyWithCommas(item)}</div>,
    },
    {
      title: "신청시간",
      dataIndex: "created_at",
      key: "created_at",
      align: "left",
      width: 200,
      render: (created_at) => {
        const date = dayjs(created_at).format(formatDateTime);
        return <span>{date}</span>;
      },
    },
    {
      title: "처리시간",
      dataIndex: "processing_at",
      key: "processing_at",
      align: "left",
      width: 200,
      render: (processing_at) => {
        return (
          <span>
            {processing_at ? dayjs(processing_at).format(formatDateTime) : "--"}
          </span>
        );
      },
    },
    {
      title: "처리자",
      align: "left",
      width: 200,
      dataIndex: "processer_id",
      key: "processer_id",
      render: (data) => <div>{data ?? "--"}</div>,
    },
    {
      title: "상태",
      align: "left",
      width: 200,
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return <p>{status}</p>;
      },
    },
    {
      title: "설정",
      align: "center",
      width: 150,
      dataIndex: "setting",
      key: "setting",
      fixed: "right",
      render: (_, data) => {
        const btnDeleteRef = React.createRef<PopupRef>();
        const btnAcepeRef = React.createRef<PopupRef>();

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {data.status === "Waiting for process" ? (
              <div style={{ display: "flex", gap: 10 }}>
                <PopupConfirm
                  onSubmit={() =>
                    paymentApi
                      .process({
                        action: "Rejected",
                        admin_id: id,
                        ticket_id: data.id,
                      })
                      .then((i) => {
                        if (i) {
                          Utils.notification.success("성공")

                        }
                        else Utils.notification.error("실패한");
                      })
                  }
                  ref={btnDeleteRef}
                  selector={
                    <Button
                      type="primary"
                      danger
                      onClick={() => btnDeleteRef.current?.open()}
                    >
                      <CloseOutlined />
                    </Button>
                  }
                  title="거부"
                  content={"거부하고 싶습니까 ?" + data.user_id}
                />
                <PopupConfirm
                  onSubmit={() =>
                    paymentApi
                      .process({
                        action: "Approved",
                        admin_id: id,
                        ticket_id: data.id,
                      })
                      .then((i) => {

                        if (i) {

                          return Utils.notification.success("성공")
                        };
                      })
                      .catch((err) =>
                        Utils.notification.error(err.response.data?.message)
                      )
                  }
                  ref={btnAcepeRef}
                  selector={
                    <Button
                      type="primary"
                      onClick={() => btnAcepeRef.current?.open()}
                    >
                      <CheckOutlined />
                    </Button>
                  }
                  title="승인"
                  content={"당신이 원하십니까 승인 " + data.user_id}
                />
              </div>
            ) : data.status === "Approved" ? (
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: 30 }}
              />
            ) : (
              <div style={{ color: "red" }}>
                <CloseCircleOutlined style={{ fontSize: 30 }} />
              </div>
            )}
          </div>
        );
      },
    },
  ];
};
export { getColumns };
