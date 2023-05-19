import { Button, Space } from "antd";
import React from "react";
import { handleExcel } from "../../../pages/membermanagement/MemberList";
import Components from "../..";
import { HeaderContent } from "../../Layout";
import { PointHistoryType } from "../../../features/auth";
import { getColumns } from "./columns";
import { queryBuilderFunc } from "../../../service/queryFunction";

export interface IPointComponent {
  point: string;
}

const PointComponent: React.FC<IPointComponent> = ({ point }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [old, _] = React.useState<PointHistoryType[]>([]);
  const [datas, setDatas] = React.useState<PointHistoryType[]>([]);

  React.useEffect(() => {
    queryBuilderFunc(
      "point_histories",
      [["user_id", "==", point]],
      undefined,
      undefined,
      (docs) => setDatas(docs as PointHistoryType[])
    );
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return datas?.slice(startIndex, endIndex);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <HeaderContent
        leftItem={
          <Button onClick={() => handleExcel(datas, "point")}>뛰어나다</Button>
        }
        loading={setLoading}
        callback={(search) => {
          if (!search.trim() || !datas) {
            return setDatas(old);
          }
          const filter = datas.filter(
            (i) =>
              i.division?.toLowerCase().includes(search.toLowerCase()) ||
              i.date_time
                ?.toString()
                .toLowerCase()
                .includes(search.toLowerCase())
          );
          setDatas(filter);
        }}
      />
      <Components.ListingTable<PointHistoryType>
        columns={getColumns()}
        pagination={datas?.length !== 0}
        loading={loading}
        datas={getCurrentPageData()}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
        paginationOptions={{
          page: { current: currentPage },
          total: point?.length,
        }}
        paginationChange={(change) => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
      />
    </Space>
  );
};

export default PointComponent;
