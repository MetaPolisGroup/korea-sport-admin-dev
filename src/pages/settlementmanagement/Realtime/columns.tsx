import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Box from "../../../components/Box";

export const getColumns = (): ColumnsType<any> => [
  {
    title: "상태",
    render() {
      return <div>정상</div>;
    },
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    title: "등록일",
    render: (created_at) => (
      <p>{dayjs(created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
    ),
  },
  {
    key: "division",
    dataIndex: "division",
    title: "구분",
    render: (division) => <p>{division}</p>,
  },
  {
    key: "partner_name",
    dataIndex: "partner_name",
    title: "파트너명",
    render: (partner_name) => <p>{partner_name}</p>,
  },
  {
    key: "partner_name",
    dataIndex: "partner_name",
    title: "회원수",
    render: (_, data) => {
      return (
        <Box<{ partner_id: string }>
          id={data.partner_name}
          collectionName="users"
          filters={[
            ["partner_id", "==", data.partner_name],
            ["situation", "==", "Normal"],
          ]}
          render={(item) => {
            return <div>{0}</div>;
          }}
        />
      );
    },
  },
  {
    key: "balance",
    dataIndex: "balance",
    title: "회원캐쉬",
  },
  {
    key: "empty1",
    dataIndex: "empty1",
    title: "지급캐쉬",
    render: () => <p>0</p>,
  },
  {
    key: "empty2",
    dataIndex: "empty2",
    title: "보유포인트",
    render: () => <p>0</p>,
  },
  {
    key: "empty3",
    dataIndex: "empty3",
    title: "지급포인트",
    render: () => <p>0</p>,
  },
  {
    key: "empty4",
    dataIndex: "empty4",
    title: "전환포인트",
    render: () => <p>0</p>,
  },
  {
    key: "hardMount1",
    dataIndex: "hardMount1",
    title: "정산방식",
    render: () => <p>수익+롤링</p>,
  },
  {
    key: "hardMount2",
    dataIndex: "hardMount2",
    title: "커미션",
    render: () => <p>0.0%</p>,
  },
  {
    key: "empty4",
    dataIndex: "empty4",
    title: "입금",
    render: () => <p>0</p>,
  },
  {
    key: "empty5",
    dataIndex: "empty5",
    title: "출금",
    render: () => <p>0</p>,
  },
  {
    key: "empty6",
    dataIndex: "empty6",
    title: "지점출금",
    render: () => <p>0</p>,
  },
  {
    key: "empty7",
    dataIndex: "empty7",
    title: "배팅",
    render: () => <p>0</p>,
  },
  {
    key: "empty8",
    dataIndex: "empty8",
    title: "승리",
    render: () => <p>0</p>,
  },
  {
    key: "empty9",
    dataIndex: "empty9",
    title: "롤링수익(SPORTS)",
    render: () => <p>0</p>,
  },
  {
    key: "empty10",
    dataIndex: "empty10",
    title: "롤링수익(CASINO)",
    render: () => <p>0</p>,
  },
  {
    key: "empty11",
    dataIndex: "empty11",
    title: "수익분배",
    render: () => <p>0</p>,
  },
];

export default {};
