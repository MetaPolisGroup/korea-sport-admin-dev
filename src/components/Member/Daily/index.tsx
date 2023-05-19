import { Button, Form, Space } from 'antd'
import React from 'react'
import Components from '../../../components'
import { IUser } from '../../../features/auth'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { getColumns } from './columns'

const Daily = () => {
    const [data, setData] = React.useState([{
        division: 'System',
        deposit: '0(0/0)',
        withdraw: '0(0/0)',
        branch_withdrawal: '0(0/0)',
        entry: '0(0/0)',
    }])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);
    const [user, setUser] = React.useState<IUser[]>([])

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
        <React.Fragment>
            <Space style={{ marginBottom: 10 }} direction='vertical'>
                <Form layout='vertical' style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <Components.Input.Text label='from' name='from' />
                    <Components.Input.Text label='to' name='to' />
                    <Button htmlType='submit' style={{ marginTop: 5 }}>검색</Button>
                </Form>
                <Form layout='vertical' style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <Components.Input.Text name='deposit' label='입금 합계' disabled initialValue={0} />
                    <Components.Input.Text name='withdraw' label='출금 합계' disabled initialValue={0} />
                    <Components.Input.Text name='calculate' label='정산' disabled initialValue={0} />
                </Form>
            </Space>
            <Components.ListingTable<any>
                columns={getColumns(user)}
                datas={getCurrentPageData()}
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

export default Daily
