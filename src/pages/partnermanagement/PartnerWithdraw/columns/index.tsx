import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IPartnerManageMent } from "../../../../api/partnersApi";
import { IUser } from "../../../../features/auth";
import Utils from "../../../../utils";

const getColumns = (user: IUser[]): ColumnsType<IPartnerManageMent> => {

  return [
    {
      title: "번호",
      align: "center",
      width: 100,
      render: (a, b, c) => <p>{c + 1}</p>
    },
    {
      title: "파트너",
      align: "center",
      key: 'name',
      dataIndex: 'name' // name
    },
    {
      title: "신청 관리자",
      align: "center",
      key: 'ip',
      dataIndex: 'ip',// --
      render: () => <p>정상</p>
    },
    {
      title: "보유머니",
      align: "center",
      key: 'nation',
      dataIndex: 'nation',// --
      render: () => <p>--</p>

    },
    {
      title: "누적정산",
      align: "center",
      key: 'browser',
      dataIndex: 'browser',// --
      render: () => <p>--</p>
    },
    {
      title: "누적출금",
      align: "center",
      key: 'balance',
      dataIndex: 'balance', // balance
      render: (b) => <p>{Utils.convertCurrencyWithCommas(b)}</p>
    },
    {
      title: "계좌정보",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "신청금액",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "신청타입",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "대상유저",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "신청시간",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "처리시간",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "처리자",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "상태",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "설정",
      align: "center",
      render: (a, b, c) => {

        return <p>0/{user.length}</p>
      }
    },
    {
      title: "설정",
      align: "center",
      render: () => {

        return <Space>
          <Button>Edit</Button>
          <Button>보유머니 관리</Button>
        </Space>
      }
    },
  ]
};
export { getColumns };
