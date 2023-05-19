import { Button, Space } from "antd";
import React from "react";
import { handleExcel } from "..";
import Components from "../../../components";
import { IUser } from "../../../features/auth";
import { queryBuilderFunc } from "../../../service/queryFunction";
import { getColumns } from "./columns";

const EntryExit = () => {
  const [data, setData] = React.useState([
    {
      division: "System",
      deposit: "0(0/0)",
      withdraw: "0(0/0)",
      branch_withdrawal: "0(0/0)",
      entry: "0(0/0)",
    },
  ]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [user, setUser] = React.useState<any[]>([]);

  // React.useEffect(() => {
  //   (async () => {
  //     await queryBuilderFunc(
  //       "cash_histories",
  //       [
  //         ["type.type", "==", "user"],
  //         ["type.division", "==", "Deposit"],
  //       ],
  //       undefined,
  //       undefined,
  //       (doc) => {
  //         setData(doc as any[]);
  //         setLoading(false);
  //       }
  //     );
  //     await queryBuilderFunc('users', [], undefined, undefined, doc => {
  //       setUser(doc as IUser[])
  //       setLoading(false)
  //     })
  //   })();
  // }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  return (
    <React.Fragment>
      <Space style={{ marginBottom: 10 }} direction="vertical">
        <h2>파트너 출금 관리</h2>
        <Button onClick={() => handleExcel(data, "entry")}>뛰어나다</Button>
      </Space>
      <Components.ListingTable<any>
        columns={getColumns(user)}
        datas={getCurrentPageData()}
        pagination
        paginationOptions={{
          page: { current: currentPage },
          total: data.length,
        }}
        paginationChange={(change) => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
        // loading={loading}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </React.Fragment>
  );
};

export default EntryExit;
