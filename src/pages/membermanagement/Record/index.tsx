import { Button, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { handleExcel } from '..';
import Components from '../../../components';
import { HeaderContent } from '../../../components/Layout';
import { queryBuilderFunc } from '../../../service/queryFunction';
import { getColumns } from './columns';

export type TResponsiveMemberRecord = {
    activity: string;
    created_at: number;
    delete: boolean;
    id: string;
    ip: string;
    type: string;
    url: string;
    user_id: string;
};

interface IComponentMemberRecored {
    id?: string;
}

const MemberRecord: React.FC<IComponentMemberRecored> = ({ id }) => {
    const [data, setData] = useState<TResponsiveMemberRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(30);
    const [old, setOld] = React.useState<TResponsiveMemberRecord[]>([])

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (!id)
                await queryBuilderFunc(
                    'logs',
                    [['type', '==', 'Record'],],
                    [{ field: 'created_at', direction: 'desc' }],
                    undefined,
                    (doc) => {
                        setData(doc as TResponsiveMemberRecord[]);
                        if (old?.length === 0)
                            setOld(doc as TResponsiveMemberRecord[]);

                        setLoading(false);
                    }
                );
            else
                await queryBuilderFunc(
                    'logs',
                    [['type', '==', 'Record'], ['user_id', '==', id]],
                    [{ field: 'created_at', direction: 'desc' }],
                    undefined,
                    (doc) => {
                        setData(doc as TResponsiveMemberRecord[]);
                        if (old?.length === 0)
                            setOld(doc as TResponsiveMemberRecord[]);

                        setLoading(false);
                    }
                );
        })();
    }, []);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    return (
        <React.Fragment>
            <HeaderContent leftItem={<Button onClick={() => handleExcel(data, 'record')}>
                뛰어나다
            </Button>}
                loading={setLoading} callback={search => {
                    if (!search.trim() || !data) {
                        return setData(old)
                    }
                    const filter = data.filter((i) =>
                        i.user_id?.toString().toLowerCase().includes(search.toLowerCase())
                    );
                    setData(filter)
                }} />

            <Components.ListingTable<TResponsiveMemberRecord>
                columns={getColumns()}
                pagination
                datas={getCurrentPageData()}
                loading={loading}
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
        </React.Fragment>
    );
};
export default MemberRecord;

