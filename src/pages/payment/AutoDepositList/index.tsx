import React from "react";
import Components from "../../../components";
import { Form, Button, Space, DatePicker } from "antd";
import { getColumns } from "./columns";
import { useAppSelector } from "../../../app/hook";
import { queryBuilderFunc } from "../../../service/queryFunction";
import paymentApi, { IDepositData } from "../../../api/payment";
import { TableRowSelection } from "antd/es/table/interface";
import { PopupConfirm, PopupRef } from "../../../components/Popup";
import { handleExcel } from "..";
import { HeaderContent } from "../../../components/Layout";
import Utils from "../../../utils";
import dayjs from "dayjs";
import { formatDate } from "../../../components/Input/DatePicker";

const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2).getTime();
const end = new Date(now).getTime();

const AutoDepositList = () => {
  const [datas, setDatas] = React.useState<IDepositData[]>([]);
  const [form] = Form.useForm();
  const { id } = useAppSelector((state) => state.auth.auth);
  const [status, setStatus] = React.useState('Waiting for process')
  const [old, setOld] = React.useState<IDepositData[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [select, setSelected] = React.useState<IDepositData[]>()
  const btnAcept = React.createRef<PopupRef>()
  const btnReject = React.createRef<PopupRef>()
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [startDay, setStartDay] = React.useState<dayjs.Dayjs | number>(start)
  const [endDay, setEndDay] = React.useState<dayjs.Dayjs | number>(end)

  // React.useEffect(() => {
  //   (async () => {
  //     if (status == '') {
  //       await queryBuilderFunc(
  //         "tickets",
  //         [
  //           //   ["created_at", ">=", Number(startDay)],
  //           // ["created_at", "<=", Number(endDay)],
  //           ["type", "==", "Deposit"]],
  //         [{ field: 'created_at', direction: 'desc' }],
  //         undefined,
  //         (docs) => {
  //           setDatas(docs as IDepositData[]);
  //           if (old.length === 0)
  //             setOld(docs as IDepositData[])
  //         })
  //     }
  //     else {
  //       await queryBuilderFunc(
  //         "tickets",
  //         [
  //           ["created_at", ">=", Number(startDay)],
  //           ["created_at", "<=", Number(endDay)],
  //           ['status', '==', status],
  //           ["type", "==", "Deposit"]],
  //         [{ field: 'created_at', direction: 'desc' }],
  //         undefined,
  //         (docs) => {
  //           setDatas(docs as IDepositData[]);
  //           if (old.length === 0)
  //             setOld(docs as IDepositData[])
  //         })
  //     }
  //   })()
  // }, [status, startDay, endDay])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return datas.slice(startIndex, endIndex);
  };

  const handleButton = (title: string, handleClose: () => void) => {
    const idTicket = select?.map(item => (item.id))
    paymentApi.processMutiple({
      ticket_id: idTicket!,
      action: title,
      admin_id: id!
    }).then(i => {
      if (i) {
        Utils.notification.success("성공")
        handleClose()
        setSelected(undefined)
      }
      else Utils.notification.error("실패한")
    })
  }

  const rowSelection: TableRowSelection<IDepositData> = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelected(selectedRows)
    },
    onSelect: (record, selectedant, selectedRows) => {
      // console.log({ record }, { selectedant }, { selectedRows });
      setSelected(selectedRows)

    },
    onSelectAll: (selectedant, selectedRows, changeRows) => {
      // console.log(selectedant, selectedRows, changeRows);
      setSelected(selectedRows)
    },
    getCheckboxProps: (record: IDepositData) => ({
      disabled: record.status === 'Rejected' || record.status === 'Approved', // Column configuration not to be checked
      status: record.status,
    }),
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <HeaderContent styleSearch={{ marginTop: 120 }}
        isSearch
        leftItem={<Space size={20} direction="vertical" >
          <h1>자동입금 - 처리대기</h1>
          <Space >
            <DatePicker.RangePicker
              onChange={e => {
                setStartDay(dayjs(e?.[0]!).valueOf())
                setEndDay(dayjs(e?.[1]!).valueOf())
              }}
              format={formatDate}
              clearIcon={false}
            />
          </Space>
          <Space direction='vertical'>
            <Space>
              <Button onClick={() => handleExcel(datas, 'deposit')}>Excel</Button>
              <ButtonAction status={status} setStatus={setStatus} title='' label='처리불가' />
              <ButtonAction status={status} setStatus={setStatus} title='' label='전체내역' />
              <ButtonAction status={status} setStatus={setStatus} title='' label='처리대기' />
              <ButtonAction status={status} setStatus={setStatus} title='' label='삭제목록' />
              <PopupConfirm
                ref={btnReject}
                onSubmit={() => handleButton('Rejected', btnReject.current?.close()!)}
                title='거부하다'
                content='당신은 거절 할 것입니다 ?'
                selector={<Button disabled={select?.length === 0 || typeof (select) === 'undefined'} onClick={() => btnReject.current?.open()}>선택삭제</Button>}
              />
            </Space>
          </Space>
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
        rowSelection={{ ...rowSelection }}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </Space>
  );
};

const filterDatas = (callback: () => void) => {
  callback?.()
}

const ButtonAction: React.FC<{
  title: string,
  label: string,
  setStatus: React.Dispatch<string>,
  status: string,
}> = ({ title, setStatus, label, status }) => {
  return <Button onClick={() => {
    filterDatas(() => setStatus(title))
  }} className={status === title ? 'active' : ''}>
    {label}
  </Button>
}
export default AutoDepositList;
