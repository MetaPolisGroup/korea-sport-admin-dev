import { Button, Space } from 'antd';
import React from 'react'
import { handleExcel } from '../../../pages/membermanagement/MemberList';
import Components from '../..';
import { HeaderContent } from '../../Layout';
import { getColumns } from './columns';

export interface IOtherComponent {
}

const BetOther: React.FC<IOtherComponent> = () => {
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);
    const [data, setData] = React.useState<[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false)
    const [old, _] = React.useState<[]>([])

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };



    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            <HeaderContent leftItem={<Space>
                <Button onClick={() => handleExcel(data, 'cash')}>뛰어나다</Button>
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
            <Components.ListingTable<any>
                columns={getColumns()}
                pagination={data?.length !== 0}
                loading={loading}
                datas={getCurrentPageData()}
                render={(data, value, indexRow, indexColumn) => {
                    return <span>{value}</span>;
                }}
                paginationOptions={{
                    page: { current: currentPage },
                    total: data.length
                }}
                paginationChange={change => {
                    setCurrentPage(change.page);
                    setPageSize(change.pageSize);
                }}
            />
        </Space>
    )
}

export default BetOther
