import { Button, Space } from 'antd';
import React from 'react'
import { handleExcel } from '../../../pages/membermanagement/MemberList';
import Components from '../..';
import { HeaderContent } from '../../Layout';
import { ICashHistory, IUser } from '../../../features/auth';
import { getColumns } from './columns';
import { queryBuilderFunc } from '../../../service/queryFunction';

interface ICashComponent {
    user_id: string
}

const Referral: React.FC<ICashComponent> = ({ user_id }) => {
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);
    const [data, setData] = React.useState<IUser[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false)
    const [old, setOld] = React.useState<IUser[]>([])

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    React.useEffect(() => {
        (async () => await queryBuilderFunc('users', [['recommend_id', '==', user_id]], undefined, undefined, value => {
            setData(value as IUser[])
            if (old.length === 0)
                setOld(value as IUser[])
        }))()
    }, [])

    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            <HeaderContent isSearch={true} leftItem={<Space>
                <Button onClick={() => handleExcel(data, 'cash')}>뛰어나다</Button>
            </Space>}
                loading={setLoading} callback={search => {
                    if (!search.trim() || !data) {
                        return setData(old)
                    }
                    const filter = data.filter((i) =>
                        i.id?.toLowerCase().includes(search.toLowerCase())
                        // i.date_time?.toString().toLowerCase().includes(search.toLowerCase())
                    );
                    setData(filter)
                }} />
            <Components.ListingTable<IUser>
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

export default Referral
