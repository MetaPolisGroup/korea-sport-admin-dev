import { Button, Form, Space } from 'antd'
import React from 'react'
import Components from '../../../components'
import { IUser } from '../../../features/auth'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { HeaderContent } from '../../Layout'
import { getColumns } from './columns'

const Manua = () => {
    const [data, setData] = React.useState([])
    const [old, setOld] = React.useState([])
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
            <HeaderContent isSearch={true}
                leftItem={<p></p>}
                loading={setLoading} callback={search => {
                    if (!search.trim() || !data) {
                        return setData(old)
                    }
                    // const filter = data.filter((i) =>
                    //     i.user_id?.toLowerCase().includes(search.toLowerCase()) ||
                    //     i.nickname?.toLowerCase().includes(search.toLowerCase()) ||
                    //     i.partner_id?.toString().toLowerCase().includes(search.toLowerCase())
                    // );
                    // setDatas(filter)
                }} />
            <Components.ListingTable<any>
                columns={getColumns(user)}
                datas={getCurrentPageData()}
                pagination
                bordered
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

export default Manua
