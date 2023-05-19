import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IGameManagementProps } from "..";
import Components from "../../../../components";
import Utils from "../../../../utils";

const getColumns = (): ColumnsType<IGameManagementProps> => {

  return [
    {
      title: "게임사 이름",
      align: "center",
      width: 100,
      dataIndex: "name",
    },
    {
      title: "게임 종류",
      align: "center",
      key: 'ip',
      dataIndex: 'ip',
      render: () => <p>정상</p>
    },
    {
      title: "게임사 사용여부",
      align: "center",
      key: 'nation',
      dataIndex: 'nation',
      render: (a, b, c) => <Components.Input.Select name={'game' + c} label='' data={Array(2).fill(0).map((_, idx) => ({
        key: idx === 0 ? 0 : 1,
        value: idx === 0 ? 0 : 1,
        text: idx === 0 ? 'Y' : 'N',
      }))} />

    },
    {
      title: "점검여부",
      align: "center",
      key: 'browser',
      dataIndex: 'browser',
      render: (a, b, c) => <Components.Input.Select name={'inspection' + c} label='' data={Array(2).fill(0).map((_, idx) => ({
        key: idx === 0 ? 0 : 1,
        value: idx === 0 ? 0 : 1,
        text: idx === 0 ? 'Y' : 'N',
      }))} />
    },
    {
      title: "표시순서",
      align: "center",
      key: 'balance',
      dataIndex: 'balance', 
      render: (a, b, c) => <Components.Input.Text name={'order' + c} />
    },
    {
      title: "처리",
      align: "center",
      render: () => {
        return <Space>
          <Button>Save</Button>
          <Button>게임 업데이트</Button>
        </Space>
      }
    },
  ]
};
export { getColumns };
