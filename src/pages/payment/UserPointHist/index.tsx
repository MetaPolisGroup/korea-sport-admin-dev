import React from "react";
import Components from "../../../components";
import { Form, Button, Space, DatePicker } from "antd";
import { useAppSelector } from "../../../app/hook";
import { getAllDocuments, queryBuilderFunc } from "../../../service/queryFunction";
import paymentApi, { IDepositData } from "../../../api/payment";
import { TableRowSelection } from "antd/es/table/interface";
import { PopupConfirm, PopupRef } from "../../../components/Popup";
import { handleExcel } from "..";
import { HeaderContent } from "../../../components/Layout";
import Utils from "../../../utils";
import dayjs from "dayjs";
import { formatDate } from "../../../components/Input/DatePicker";
import { getColumns } from "./columns";

const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
const end = new Date(now).getTime();

const UserPoinHist = () => {
  const [datas, setDatas] = React.useState<IDepositData[]>([]);
  const [status, setStatus] = React.useState('Waiting for process')
  const [old, setOld] = React.useState<IDepositData[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [startDay, setStartDay] = React.useState<dayjs.Dayjs | number>()
  const [endDay, setEndDay] = React.useState<dayjs.Dayjs | number>()

  React.useEffect(() => {
    (async () => {

      await queryBuilderFunc(
        "point_histories",
        [
          ["created_at", ">=", Number(startDay ?? start)],
          ["created_at", "<=", Number(endDay ?? end)]],
        [{ field: 'created_at', direction: 'desc' }],
        undefined,
        (docs) => {
          setDatas(docs as IDepositData[]);
          if (old.length === 0)
            setOld(docs as IDepositData[])
        })
    })()
  }, [status, startDay, endDay])
  console.log(datas)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return datas.slice(startIndex, endIndex);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <HeaderContent styleSearch={{ marginTop: 100 }} isSearch
        leftItem={<Space size={20} direction="vertical" >
          <h1>회원 포인트 기록</h1>
          <Space>
            <DatePicker.RangePicker
              onChange={e => {
                setStartDay(dayjs(e?.[0]!).valueOf())
                setEndDay(dayjs(e?.[1]!).valueOf())
              }}
              format={formatDate}
              clearIcon={false}
            />
          </Space>
          <Button onClick={() => handleExcel(datas, '회원 포인트 기록')}>뛰어나다</Button>
        </Space>}
        loading={setLoading} callback={search => {
          if (!search.trim() || !datas) {
            return setDatas(old)
          }
          const filter = datas.filter((i) =>
            i.user_id?.toLowerCase().includes(search.toLowerCase()) ||
            i.nickname?.toLowerCase().includes(search.toLowerCase()) ||
            i.partner_id?.toString().toLowerCase().includes(search.toLowerCase())
          );
          setDatas(filter)
        }} />

      <Components.ListingTable<IDepositData>
        columns={getColumns()}
        pagination
        datas={getCurrentPageData()}
        paginationOptions={{
          page: { current: currentPage },
          total: datas.length
        }}
        paginationChange={change => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
        loading={loading}
        srollX={1200}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </Space>
  );
};

export default UserPoinHist;
