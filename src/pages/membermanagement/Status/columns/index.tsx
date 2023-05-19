import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TResponsiveMemberStatus } from "..";
import { formatDateTime } from "../../../../components/Input/DatePicker";

const getColumns = (): ColumnsType<TResponsiveMemberStatus> => {

  return [
    {
      title: "번호",
      align: "center",
      width: 100,
      render: (_, data, index) => index + 1,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.created_at - b.created_at,
    },
    {
      title: "닉네임",
      align: "center",
      key: 'user_id',
      dataIndex: 'user_id'
    },
    {
      title: "아이피",
      align: "center",
      key: 'ip',
      dataIndex: 'ip'
    },
    {
      title: "국가",
      align: "center",
      key: 'nation',
      dataIndex: 'nation'
    },
    {
      title: "브라우저",
      align: "center",
      key: 'browser',
      dataIndex: 'browser'
    },
    {
      title: "페이지",
      align: "center",
      key: 'url',
      dataIndex: 'url',
    },
  ]
};
export { getColumns };
