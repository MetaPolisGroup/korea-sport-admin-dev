import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IPartnerManageMent } from "../../../../api/partnersApi";
import { IUser } from "../../../../features/auth";
import Utils from "../../../../utils";

const getColumns = (user: IUser[]): ColumnsType<IPartnerManageMent> => {

  return [
    {
      title: "No.",
      align: "center",
      width: 50,
      render: (a, b, c) => <p>{c + 1}</p>
    },
    {
      title: "관리자",
      align: "center",
      key: 'deposit',
      width: 50,
      dataIndex: 'deposit' // name
    },
    {
      title: "구분",
      align: "center",
      key: 'withdraw',
      width: 50,
      dataIndex: 'withdraw',// --
    },
    {
      title: "내용",
      align: "center",
      key: 'branch_withdrawal',
      width: 50,
      dataIndex: 'branch_withdrawal',// --
    },
    {
      title: "시간",
      align: "center",
      key: 'branch_withdrawal',
      width: 50,
      dataIndex: 'branch_withdrawal',// --

    },
  ]
};
export { getColumns };
