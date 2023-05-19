import { Button, DatePicker, Form, Space } from "antd";
import dayjs from "dayjs";
import React from "react";
import { handleExcel } from "..";
import Components from "../../../components";
import { formatDate } from "../../../components/Input/DatePicker";
import { HeaderContent } from "../../../components/Layout";
import { IUser } from "../../../features/auth";
import { queryBuilderFunc } from "../../../service/queryFunction";

import { getColumns } from "./columns";

export interface IGameRecordProps { }

const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
const end = new Date(now).getTime();

const GameRecord = () => {
    const [data, setData] = React.useState<IGameRecordProps[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);
    const [user, setUser] = React.useState<IUser[]>([]);
    const [old, _] = React.useState<[]>([])
    const [startDay, setStartDay] = React.useState<dayjs.Dayjs | number>(start)
    const [endDay, setEndDay] = React.useState<dayjs.Dayjs | number>(end)

    // React.useEffect(() => {
    //   (async () => {
    //     await queryBuilderFunc('partners', [], undefined, undefined, doc => {
    //       setData(doc as IPartnerManageMent[])
    //       setLoading(false)
    //     })
    //     await queryBuilderFunc('users', [], undefined, undefined, doc => {
    //       setUser(doc as IUser[])
    //       setLoading(false)
    //     })
    //   })()
    // }, [])

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    return (
        <Form layout="vertical">
            <HeaderContent styleSearch={{ marginTop: 70 }} isSearch leftItem={<Space direction="vertical">
                <h2>CASINO/SLOT-베팅내역</h2>
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

                <Button onClick={() => handleExcel(data, 'casino-game')}>뛰어나다</Button>
            </Space>}
                loading={setLoading} callback={search => {
                    if (!search.trim() || !data) {
                        return setData(old)
                    }
                    // const filter = data.filter((i) =>
                    //     i.division?.toLowerCase().includes(search.toLowerCase()) ||
                    //     i.date_time?.toString().toLowerCase().includes(search.toLowerCase())
                    // );
                    // setData(filter)
                }} />
            <Components.ListingTable<IGameRecordProps>
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
        </Form>
    );
};

export default GameRecord;
