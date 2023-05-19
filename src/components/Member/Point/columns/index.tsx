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
    },
    {
      title: "이전금액",
      align: "center",
      key: "before_point",
      dataIndex: "before_point",
      render: (before_amount) => (
        <p>{Utils.convertCurrencyWithCommas(before_amount)}</p>
      ),
    },
    {
      title: "변동금액",
      align: "center",
      key: "transaction_point",
      dataIndex: "transaction_point",
      render: (transaction_amount) => (
        <p>{Utils.convertCurrencyWithCommas(transaction_amount)}</p>
      ),
    },
    {
      title: "이후포인트",
      align: "center",
      key: "after_point",
      dataIndex: "after_point",
      render: (after_amount) => (
        <p>{Utils.convertCurrencyWithCommas(after_amount)}</p>
      ),
    },
    {
      title: "생성일",
      align: "center",
      key: "date_time",
      dataIndex: "date_time",
      render: (date) => {
        return <p>{dayjs(date).format(formatDateTime)}</p>;
      },
    },
  ];
};
export { getColumns };
