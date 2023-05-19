import { Button, DatePicker, Space } from "antd";
import React from "react";

import Components from "../../../components";
import { IUser } from "../../../features/auth";
import { handleExcel } from "..";
import { getColumns } from "./columns";
import dayjs from "dayjs";
import { formatDate } from "../../../components/Input/DatePicker";
import { queryBuilderFunc } from "../../../service/queryFunction";
import { IPartnerManageMent } from "../../../api/partnersApi";

const now = new Date();

const start = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 2
).getTime();
const end = new Date(now).getTime();

const Details: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [user, setUser] = React.useState<IUser[]>([]);
  const [startDay, setStartDay] = React.useState<dayjs.Dayjs | number>(start);
  const [endDay, setEndDay] = React.useState<dayjs.Dayjs | number>(end);

  React.useEffect(() => {
    (async () => {
      await queryBuilderFunc("partners", [], undefined, undefined, (doc) => {
        setData(doc as IPartnerManageMent[]);
        setLoading(false);
      });
    })();
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  console.log({ data });

  return (
    <React.Fragment>
      <Space style={{ marginBottom: 10 }} direction="vertical">
        <h2>파트너 정산내역</h2>
        <Button onClick={() => handleExcel(data, "record")}>뛰어나다</Button>
      </Space>
      <Space>
        <DatePicker.RangePicker
          onChange={(e) => {
            setStartDay(dayjs(e?.[0]!).valueOf());
            setEndDay(dayjs(e?.[1]!).valueOf());
          }}
          format={formatDate}
          clearIcon={false}
        />
      </Space>
      <Components.ListingTable<any>
        columns={getColumns()}
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

export default Details;
