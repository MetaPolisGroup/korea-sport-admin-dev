import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICashHistory, IUser } from "../../../../features/auth";
import Utils from "../../../../utils";

const getColumns = (): ColumnsType<ICashHistory> => {

  return [
    {
      title: "번호",
      align: "center",
      width: 100,
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: "파트너",
      align: "center",
      render: () => {
        return <p></p>
      }
    },
    {
      title: "구분",
      align: "center",
      key: 'name',
      dataIndex: 'name' // name
    },
    {
      title: "이전금액",
      align: "center",
      key: 'ip',
      dataIndex: 'ip',// --
      render: () => <p>정상</p>
    },
    {
      title: "이전금액",
      align: "center",
      key: 'nation',
      dataIndex: 'nation',// --
      render: () => <p>--</p>

    },
    {
      title: "변동금액",
      align: "center",
      key: 'browser',
      dataIndex: 'browser',// --
      render: () => <p>--</p>
    },
    {
      title: "이후금액",
      align: "center",
      key: 'balance',
      dataIndex: 'balance', // balance
      render: (b) => <p>{Utils.convertCurrencyWithCommas(b)}</p>
    },
    {
      title: "비고",
      align: "center",
      render: (a, b, c) => {

        return <p></p>
      }
    },
    {
      title: "생성일",
      align: "center",
      render: (a, b, c) => {

        return <p></p>
      }
    },

  ]
};
export { getColumns };
