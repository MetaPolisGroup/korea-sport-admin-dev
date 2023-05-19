import React from "react";
import { Button, Form, Space } from "antd";
import Components from "../../../components";
import getColumn from "./column";
import { queryBuilderFunc } from "../../../service/queryFunction";
import { ESportType, IMatchesResponse } from "../../../api/matchesApi";
import { HeaderContent } from "../../../components/Layout";

const MatchList: React.FC = () => {
    const [data, setData] = React.useState<IMatchesResponse[]>([])
    const [loading, setLoading] = React.useState<boolean>()
    const [select, setSelected] = React.useState<string[]>([ESportType.SOCCER])
    const [old, setOld] = React.useState<IMatchesResponse[]>([])
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);

    const OPTION_SELECT = [
        { key: ESportType.SOCCER, value: ESportType.SOCCER, text: "축구" },
        { key: ESportType.BASKETBALL, value: ESportType.BASKETBALL, text: "농구" },
        { key: ESportType.BASEBALL, value: ESportType.BASEBALL, text: "야구" },
        { key: ESportType.HOCKEY, value: ESportType.HOCKEY, text: "하키" },
        { key: ESportType.FOOTBALL, value: ESportType.FOOTBALL, text: "축구" },
        { key: ESportType.VOLLEYBALL, value: ESportType.VOLLEYBALL, text: "배구" },
    ];

    const LIST_BTN = [
        {
            id: "btn1",
            title: "선택 경기 삭제",
            action: () => { },
        },
        {
            id: "btn2",
            title: "선택 경기 삭제",
            action: () => { },
        },
        {
            id: "btn3",
            title: "조회",
            action: () => { },
        },
    ];

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await queryBuilderFunc("matches", [
                ["time_status", "==", '1'],
                ["sport_id", "in", select as any]
            ]).then(i => {
                setData(i as IMatchesResponse[])
                setLoading(false)
                if (old.length === 0)
                    setOld(i as IMatchesResponse[])
            })
        })()
    }, [select])

    // const rowSelection: TableRowSelection<IMatchesResponse> = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         setSelected(selectedRows)
    //     },
    //     onSelect: (record, selectedant, selectedRows) => {
    //         setSelected(selectedRows)

    //     },
    //     onSelectAll: (selectedant, selectedRows, changeRows) => {
    //         setSelected(selectedRows)
    //     },
    // };
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    return (
        <Form className="match-list">
            <HeaderContent styleSearch={{ marginTop: 100 }}
                leftItem={<div className="match-list__header">
                    <h2>스포츠 경기를 선택하세요</h2>
                    <p>미선택시 전체 스포츠</p>
                    <Components.Input.Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        data={OPTION_SELECT}
                        className="select"
                        onChange={e => setSelected(e)}
                        initialValue={select}
                        name='search'
                        label=''
                    />
                    <Space className="boxBtn" style={{ marginTop: 20 }} size={15}>
                        {LIST_BTN?.map?.((item) => {
                            return (
                                <Button
                                    key={item?.id}
                                    onClick={() => item?.action()}  >
                                    {item?.title}
                                </Button>
                            );
                        })}
                    </Space>
                </div>}
                loading={setLoading} callback={search => {
                    if (!search.trim() || !data) {
                        return setData(old)
                    }
                    const filter = data.filter((i) =>
                        i.nation?.toLowerCase().includes(search.toLowerCase()) ||
                        i.home?.name?.toLowerCase().includes(search.toLowerCase()) ||
                        i.away?.name?.toLowerCase().includes(search.toLowerCase())
                    );
                    setData(filter)
                }}
            />
            <div className="match-list__content">
                <Components.ListingTable<IMatchesResponse>
                    columns={getColumn()}
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
                // rowSelection={{type: 'checkbox'}}
                />
            </div>
        </Form>
    );
};

export default MatchList;