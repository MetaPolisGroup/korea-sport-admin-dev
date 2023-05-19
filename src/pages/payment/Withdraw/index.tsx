import React from "react";
import Components from "../../../components";
import { Form, Button, Space, DatePicker } from "antd";
import { getColumns } from "../columns";
import { useAppSelector } from "../../../app/hook";
import { queryBuilderFunc } from "../../../service/queryFunction";
import paymentApi, { IDepositData } from "../../../api/payment";
import { TableRowSelection } from "antd/es/table/interface";
import { PopupConfirm, PopupRef } from "../../../components/Popup";
import Utils from "../../../utils";
import dayjs from "dayjs";
import { formatDate } from "../../../components/Input/DatePicker";
import { handleExcel } from "..";
import { HeaderContent } from "../../../components/Layout";

const Withdraw = () => {
    const [datas, setDatas] = React.useState<IDepositData[]>([]);
    const [form] = Form.useForm();
    const { id } = useAppSelector((state) => state.auth.auth);
    const [old, setOld] = React.useState<IDepositData[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const [status, setStatus] = React.useState('')
    const [select, setSelected] = React.useState<IDepositData[]>()
    const btnAcept = React.createRef<PopupRef>()
    const btnReject = React.createRef<PopupRef>()
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);

    React.useEffect(() => {
        (async () => {
            if (status === '') {
                await queryBuilderFunc(
                    "tickets",
                    [["type", "==", "Withdraw"]],
                    [{ field: 'created_at', direction: 'desc' }],
                    undefined,
                    (docs) => {
                        setDatas(docs as IDepositData[]);
                        if (old.length === 0)
                            setOld(docs as IDepositData[])
                    })
            }
            else {
                await queryBuilderFunc(
                    "tickets",
                    [["type", "==", "Withdraw"], ['status', '==', status]],
                    [{ field: 'created_at', direction: 'desc' }],
                    undefined,
                    (docs) => {
                        setDatas(docs as IDepositData[]);
                        if (old.length === 0)
                            setOld(docs as IDepositData[])
                    })
            }
        })()
    }, [status,])

    const handleButton = (title: string) => {
        const idTicket = select?.map(item => (item.id))
        paymentApi.processMutiple({
            ticket_id: idTicket!,
            action: title,
            admin_id: id!
        }).then(i => {
            if (i)
                return Utils.notification.success("성공")
        })
        Utils.notification.success("실패한")
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

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return datas.slice(startIndex, endIndex);
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <HeaderContent styleSearch={{ marginTop: 130 }}
                leftItem={<Space size={20} direction="vertical" >
                    <h1>철회하다</h1>
                    <Space direction='vertical'>
                        {/* <Space>
                            <PopupConfirm
                                ref={btnReject}
                                onSubmit={() => handleButton('Rejected')}
                                title='거부'
                                content='당신은 모든 것을 바꾸고 싶습니까 거부 ?'
                                selector={<Button disabled={select?.length === 0} onClick={() => btnReject.current?.open()}>배치 취소 선택</Button>}
                            />
                            <PopupConfirm
                                ref={btnAcept}
                                onSubmit={() => handleButton('Approved')}
                                title='승인'
                                content='당신은 모든 것을 바꾸고 싶습니까? 승인 ?'
                                selector={<Button disabled={select?.length === 0} onClick={() => btnAcept.current?.open()}>선택의 대량 승인</Button>}
                            />
                        </Space> */}
                        <Space>
                            <Button onClick={() => handleExcel(datas, 'withdraw')}>Excel</Button>
                            <ButtonAction status={status} setStatus={setStatus} title='Waiting for process' label='승인 대기' />
                            <ButtonAction status={status} setStatus={setStatus} title='Rejected' label='취소된 내역' />
                            <ButtonAction status={status} setStatus={setStatus} title='Approved' label='승인 대기' />
                            <ButtonAction status={status} setStatus={setStatus} title='' label='전체내역' />
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
                columns={getColumns(form, id!)}
                loading={loading}
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
                rowSelection={{ ...rowSelection }}
                srollX={1200}
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
export default Withdraw;
