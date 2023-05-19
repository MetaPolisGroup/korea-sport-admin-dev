import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { formatDateTime } from "../../../Input/DatePicker";
import Utils from "../../../../utils";

const getColumns = (): ColumnsType<any> => {
  return [
    {
      title: "구분",
      align: "center",
      key: "division",
      dataIndex: "division",
      render: (_, data) => <p>{data.type.division}</p>,
    },
    {
      title: "이전금액",
      align: "center",
      key: "before_amount",
      dataIndex: "before_amount",
      render: (before_amount) => (
        <p>{Utils.convertCurrencyWithCommas(before_amount)}</p>
      ),
    },
    {
      title: "변동금액",
      align: "center",
      key: "transaction_amount",
      dataIndex: "transaction_amount",
      render: (transaction_amount) => (
        <p>{Utils.convertCurrencyWithCommas(transaction_amount)}</p>
      ),
    },
    {
      title: "이후금액",
      align: "center",
      key: "after_amount",
      dataIndex: "after_amount",
      render: (after_amount) => (
        <p>{Utils.convertCurrencyWithCommas(after_amount)}</p>
      ),
    },
    {
      title: "비고",
      align: "center",
      key: "note",
      dataIndex: "note",
      width: 500,
    },
    {
      title: "생성일",
      align: "center",
      key: "created_at",
      dataIndex: "created_at",
      render: (created_at) => {
        return <p>{dayjs(created_at).format(formatDateTime)}</p>;
      },
    },
  ];
};
export { getColumns };
