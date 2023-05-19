import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IPartnerManageMent } from "../../../../api/partnersApi";
import { IUser } from "../../../../features/auth";
import Utils from "../../../../utils";

const getColumns = (user: IUser[]): ColumnsType<IPartnerManageMent> => {

  return [
    {
      title: "시간",
      align: "center",
      width: 50,
      dataIndex: 'division',
      key: 'division'
    },
    {
      title: "종류",
      align: "center",
      key: 'deposit',
      width: 50,
      dataIndex: 'deposit' // name
    },
    {
      title: "금액",
      align: "center",
      key: 'withdraw',
      width: 50,
      dataIndex: 'withdraw',// --
    },
    {
      title: "상세",
      align: "center",
      key: 'branch_withdrawal',
      width: 50,
      dataIndex: 'branch_withdrawal',// --

    },
  ]
};
export { getColumns };
