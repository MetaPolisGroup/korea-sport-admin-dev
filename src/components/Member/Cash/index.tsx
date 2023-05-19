import { Button, Space } from "antd";
import React from "react";
import { handleExcel } from "../../../pages/membermanagement/MemberList";
import Components from "../..";
import { HeaderContent } from "../../Layout";
import { ICashHistory } from "../../../features/auth";
import { getColumns } from "./columns";
import { queryBuilderFunc } from "../../../service/queryFunction";

export interface ICashComponent {
  id: string;
}

const Cash: React.FC<ICashComponent> = ({ id }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [data, setData] = React.useState<ICashHistory[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [old, _] = React.useState<ICashHistory[]>([]);

  React.useEffect(() => {
    queryBuilderFunc(
      "cash_histories",
      [
        ["type.type", "==", "user"],
        ["type.account_id", "==", id],
      ],
      undefined,
      undefined,
      (docs) => setData(docs as ICashHistory[])
    );
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const handleFilterClick = (type: string) => {
    const filteredData = applyFilter(data, type);
    setData(filteredData);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <HeaderContent
        leftItem={
          <Space>
            <Button onClick={() => handleExcel(data, "cash")}>뛰어나다</Button>
            {buttonData.map((button) => (
              <Button
                key={button.filterType}
                onClick={() => handleFilterClick(button.filterType)}
              >
                {button.text}
              </Button>
            ))}
          </Space>
        }
        loading={setLoading}
        callback={(search) => {
          if (!search.trim() || !data) {
            return setData(old);
          }
          const filter = data.filter(
            (i) =>
              i.division?.toLowerCase().includes(search.toLowerCase()) ||
              i.date_time
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase())
          );
          setData(filter);
        }}
      />
      <Components.ListingTable<ICashHistory>
        columns={getColumns()}
        pagination={data?.length !== 0}
        loading={loading}
        datas={getCurrentPageData()}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
        paginationOptions={{
          page: { current: currentPage },
          total: data.length,
        }}
        paginationChange={(change) => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
      />
    </Space>
  );
};

export default Cash;

const buttonData = [
  { text: "전체", filterType: "all" },
  { text: "입/출+관리자", filterType: "Entry" },
  { text: "입금", filterType: "Deposit" },
  { text: "출금", filterType: "Withdraw" },
  { text: "베팅", filterType: "Bet" },
  { text: "당첨", filterType: "Winning Bet" },
  { text: "취소", filterType: "Refund" },
];

const applyFilter = (
  data: ICashHistory[],
  filterType: string
): ICashHistory[] => {
  if (filterType === "all") {
    return data;
  } else if (filterType === "Entry") {
    return data.filter(
      (item) => item.division === "Deposit" || item.division === "Withdraw"
    );
  }
  return data.filter((item) => item.division === filterType);
};
