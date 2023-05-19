import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { TResponsiveMemberRecord } from "..";
import { formatDateTime } from "../../../../components/Input/DatePicker";

const getColumns = (): ColumnsType<TResponsiveMemberRecord> => {

    return [
        {
            title: "번호",
            align: "center",
            width: 100,
            render: (_, data, index) => index + 1,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.created_at - b.created_at,
        },
        {
            title: "아이디",
            align: "center",
            key: 'user_id',
            dataIndex: 'user_id'
        },
        {
            title: "구분",
            align: "center",
            key: 'activity',
            dataIndex: 'activity'
        },
        {
            title: "URL",
            align: "center",
            key: 'url',
            dataIndex: 'url'
        },
        {
            title: "IP",
            align: "center",
            key: 'ip',
            dataIndex: 'ip'
        },
        {
            title: "생성일",
            align: "center",
            key: 'created_at',
            dataIndex: 'created_at',
            render: (created_at) => {

                return <p>{dayjs(created_at).format(formatDateTime)}</p>
            }
        },
    ]
};
export { getColumns };
