import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IPartnerManageMent } from "../../../../api/partnersApi";
import { IUser } from "../../../../features/auth";
import Utils from "../../../../utils";
import dayjs from "dayjs";

const getColumns = (): ColumnsType<IPartnerManageMent> => {
  return [
    {
      title: "구분",
      align: "center",
      width: 100,
      dataIndex: "division",
      key: "division",
      render: (division) => <p>{division}</p>,
    },
    {
      title: "파트너명",
      align: "center",
      key: "partner_name",
      dataIndex: "partner_name", // name
      render: (partner_name) => <p>{partner_name}</p>,
    },
    {
      title: "정산기간",
      align: "center",
      key: "created_at",
      dataIndex: "created_at", // --
      render: (created_at) => (
        <p>{dayjs(created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
      ),
    },
    {
      title: "마지막정산일",
      align: "center",
      key: "updated_at",
      dataIndex: "updated_at", // --
      render: (updated_at) => (
        <p>{dayjs(updated_at).format("YYYY-MM-DD HH:mm:ss")}</p>
      ),
    },
    {
      title: "지급캐쉬",
      align: "center",
      key: "entry",
      dataIndex: "entry", // --
      render: () => <p>0</p>,
    },
    {
      title: "지급/전환포인트",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "입금",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "출금",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "지점출금",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "입-출-지점출금",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "롤링수익(SPORTS)",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "롤링수익(CASINO)",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "수익분배",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "차감금액",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "카지노이용차감",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "수익->유저",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
    {
      title: "정산금",
      align: "center",
      key: "entry",
      dataIndex: "entry", // -
      render: () => <p>0</p>,
    },
  ];
};
export { getColumns };
