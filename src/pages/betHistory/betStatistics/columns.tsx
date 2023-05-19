import type { ColumnsType } from "antd/es/table";

export const COLUMNS = (): ColumnsType<any> => [
  {
    key: "name",
    dataIndex: "name",
    title: "게임",
  },
  {
    key: "bet",
    dataIndex: "bet",
    title: "BET",
  },
  {
    key: "win",
    dataIndex: "win",
    title: "WIN",
  },
  {
    key: "betWin",
    dataIndex: "betWin",
    title: "BET-WIN",
  },
];

export default {};
