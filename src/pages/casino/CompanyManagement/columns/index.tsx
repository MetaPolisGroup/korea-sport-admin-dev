import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ICompanyGameProps } from "..";
import Components from "../../../../components";

const getColumns = (): ColumnsType<ICompanyGameProps> => {

  return [
    {
      title: "게임명",
      align: "center",
      width: 100,
      dataIndex: "game_name",
      render: (a, b, c) => <Components.Input.Text name={'game_name' + c} />
    },
    {
      title: "표시순서",
      align: "center",
      width: 100,
      dataIndex: "order",
      render: (a, b, c) => <Components.Input.Text name={'order' + c} />
    },
    {
      title: "사용 여부",
      align: "center",
      width: 100,
      render: (a, b, c) => <Components.Input.Select name={'not_to_use' + c} label='' data={Array(2).fill(0).map((_, idx) => ({
        key: idx === 0 ? 0 : 1,
        value: idx === 0 ? 0 : 1,
        text: idx === 0 ? 'Y' : 'N',
      }))} />
    },
    {
      title: "인기 게임 여부",
      align: "center",
      width: 100,
      render: (a, b, c) => <Components.Input.Select name={'popular_game' + c} label='' data={Array(2).fill(0).map((_, idx) => ({
        key: idx === 0 ? 0 : 1,
        value: idx === 0 ? 0 : 1,
        text: idx === 0 ? 'Y' : 'N',
      }))} />
    },
    {
      title: "NEW YN",
      align: "center",
      render: (a, b, c) => <Components.Input.Select name={'new_in' + c} label='' data={Array(2).fill(0).map((_, idx) => ({
        key: idx === 0 ? 0 : 1,
        value: idx === 0 ? 0 : 1,
        text: idx === 0 ? 'Y' : 'N',
      }))} />
    },
    {
      title: "Platform",
      align: "center",
      dataIndex:'',
      key:''
    },
    {
      title: "PC/MOBILE",
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
      title: "게임종류",
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
