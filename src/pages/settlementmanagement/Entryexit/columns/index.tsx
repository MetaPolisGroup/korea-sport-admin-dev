import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IPartnerManageMent } from "../../../../api/partnersApi";
import { IUser } from "../../../../features/auth";
import Utils from "../../../../utils";
import { render } from "react-dom";
import Box from "../../../../components/Box";

const getColumns = (user: IUser[]): ColumnsType<IPartnerManageMent> => {
  return [
    {
      title: "구분",
      align: "center",
      width: 100,
      dataIndex: "division",
      key: "division",
    },
    {
      title: "입금",
      align: "center",
      key: "deposit",
      dataIndex: "deposit", // name
      render: (_, data) => {
        return (
          <Box
            id={""}
            collectionName="cash_histories"
            filters={[
              ["type.type", "==", "user"],
              ["type.division", "==", "Deposit"],
            ]}
            render={(item) => {
              console.log({ item });
              return <p>0</p>;
            }}
          />
        );
      },
    },
    {
      title: "출금",
      align: "center",
      key: "withdraw",
      dataIndex: "withdraw", // --
    },
    {
      title: "지점출금",
      align: "center",
      key: "branch_withdrawal",
      dataIndex: "branch_withdrawal", // --
    },
    {
      title: "입-출-지점출금",
      align: "center",
      key: "entry",
      dataIndex: "entry", // --
    },
  ];
};
export { getColumns };
