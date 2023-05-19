import type { ColumnsType } from "antd/es/table";

const getColumns = (): ColumnsType<any> => {

    return [
        {
            title: "No.",
            align: "center",
            key: 'division',
            dataIndex: 'division'
        },
        {
            title: "시간",
            align: "center",
            key: 'before_amount',
            dataIndex: 'before_amount'
        },
        {
            title: "IP",
            align: "center",
            key: 'transaction_amount',
            dataIndex: 'transaction_amount'
        },
        {
            title: "게임",
            align: "center",
            key: 'after_amount',
            dataIndex: 'after_amount'
        },
        {
            title: "상세정보",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
        {
            title: "베팅위치",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
        {
            title: "이전금액",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
        {
            title: "베팅금액",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
        {
            title: "이후금액",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
        {
            title: "배당",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
        {
            title: "Win",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
        {
            title: "상태",
            align: "center",
            key: 'note',
            dataIndex: 'note',
            width: 500
        },
    ]
};
export { getColumns };
