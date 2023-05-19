import type { ColumnsType } from "antd/es/table";
import { ITransMoneyProps } from "..";

const getColumns = (): ColumnsType<ITransMoneyProps> => {

  return [
    {
      title: "번호",
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
      title: "구분",
      align: "center",
      key: '',
      dataIndex: '',
    },
    {
      title: "이전금액",
      align: "center",
      key: '',
      dataIndex: "",
    },
    {
      title: "변동금액",
      align: "center",
      key: '',
      dataIndex: '',

    },
    {
      title: "이후금액",
      align: "center",
      width: 100,
      dataIndex: "",
      key: "",
    },
    {
      title: "비고",
      align: "center",
      key: '',
      dataIndex: '',
    },
    {
      title: "생성일	",
      align: "center",
      width: 100,
      dataIndex: "",
      key: "",
    },
  ]
};
export { getColumns };
