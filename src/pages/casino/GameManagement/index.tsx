import { Button, Form, Space } from "antd";
import React from "react";
import Components from "../../../components";
import { IUser } from "../../../features/auth";
import { queryBuilderFunc } from "../../../service/queryFunction";
import { getColumns } from "./columns";

export interface IGameManagementProps { }

const GameManagement = () => {
    const [data, setData] = React.useState<IGameManagementProps[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);
    const [user, setUser] = React.useState<IUser[]>([]);
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
            <Space style={{ marginBottom: 10 }} direction="vertical">
                <h2>게임 관리</h2>
                <Components.Input.Select label='게임사를 선택해 주세요' name='select_game' data={[]} />
            </Space>
            <Components.ListingTable<IGameManagementProps>
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

export default GameManagement;
