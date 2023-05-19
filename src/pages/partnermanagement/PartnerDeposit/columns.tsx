import type { ColumnsType } from "antd/es/table";

export const COLUMNS = (): ColumnsType<any> => [
  {
    key: "number",
    dataIndex: "number",
    title: "번호",
  },
  {
    key: "partner",
    dataIndex: "partner",
    title: "파트너",
  },
  {
    key: "application manager",
    dataIndex: "application manager",
    title: "신청 관리자",
  },
  {
    key: "holding money",
    dataIndex: "holding money",
    title: "보유머니",
  },
  {
    key: "Application amount",
    dataIndex: "Application amount",
    title: "신청금액",
  },
  {
    key: "Application time",
    dataIndex: "Application time",
    title: "신청시간",
  },
  {
    key: "processing time",
    dataIndex: "processing time",
    title: "처리시간",
  },
  {
    key: "manager",
    dataIndex: "manager",
    title: "처리자",
  },
  {
    key: "situation",
    dataIndex: "situation",
    title: "상태",
  },
  {
    key: "setting",
    dataIndex: "setting",
    title: "설정",
  },
];

export default {};
