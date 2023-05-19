import { Button, Space } from 'antd'
import React from 'react'
import { handleExcel } from '..'
import { IPartnerManageMent } from '../../../api/partnersApi'
import Components from '../../../components'
import { ICashHistory } from '../../../features/auth'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { getColumns } from './columns'

const PartnerWithdraw = () => {
    const [data, setData] = React.useState<ICashHistory[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);

    React.useEffect(() => {
        (async () => {
            await queryBuilderFunc('cash_histories', [], undefined, undefined, doc => {
                setData(doc as ICashHistory[])
                setLoading(false)
            })
        })()
    }, [])

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };
    console.log(data)
    return (
        <React.Fragment>
            <Space style={{ marginBottom: 10 }} direction='vertical'>
                <h2>파트너 캐쉬 내역</h2>
                <Button onClick={() => handleExcel(data, 'money')}>뛰어나다</Button>
            </Space>
            <Components.ListingTable<ICashHistory>
                columns={getColumns()}
                datas={getCurrentPageData()}
                loading={loading}
                pagination
                paginationOptions={{
                    page: { current: currentPage },
                    total: data.length
                }}
                paginationChange={change => {
                    setCurrentPage(change.page);
                    setPageSize(change.pageSize);
                }}
                // loading={loading}
                render={(data, value, indexRow, indexColumn) => {
                    return <span>{value}</span>;
                }}
            />
        </React.Fragment>
    )
}

export default PartnerWithdraw