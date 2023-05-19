import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IGameRecordProps } from "..";
import Components from "../../../../components";
import Utils from "../../../../utils";

const getColumns = (): ColumnsType<IGameRecordProps> => {

  return [
    {
      title: "TRANS ID",
      align: "center",
      dataIndex: "",
      key: ""
    },
    {
      title: "소속",
      align: "center",
      key: '',
      dataIndex: '',
    },
    {
      title: "아이디",
      align: "center",
      key: '',
      dataIndex: "",
    },
    {
      title: "처리시각",
      align: "center",
      key: '',
      dataIndex: '',
    },
    {
      title: "게임사",
      align: "center",
      key:'',
      dataIndex: "",
    },
    {
      title: "게임명",
      align: "center",
      key: '',
      dataIndex: '',
  
    },
    {
      title: "종류",
      align: "center",
      width: 100,
      dataIndex: "",
      key: "",
    },
    {
      title: "베팅 금액",
      align: "center",
      key: '',
      dataIndex: '',
    },
    {
      title: "승리 금액	",
      align: "center",
      width: 100,
      dataIndex: "",
      key: "",
    },
    {
      title: "ROUND ID",
      align: "center",
      key: '',
      dataIndex: '',
    },
  ]
};
export { getColumns };
