import { Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Components from "../../../../components";

const getColumns = (): ColumnsType<any> => {

    return [
        {
            title: "번호",
            align: "center",
            key: '',
            dataIndex: ''
        },
        {
            title: "원본이름",
            align: "center",
            key: '',
            dataIndex: ''
        },
        {
            title: "베팅가능 경우의 수",
            align: "center",
            key: '',
            dataIndex: ''
        },
        {
            title: "표시 마켓명",
            align: "center",
            render: (a, b, c) => <Components.Input.Text name={'a' + c} />
        },
        {
            title: "사용여부",
            align: "center",
            render: (a, b, c) => <Components.Input.Select name={'a' + c} label='' data={Array(2).fill(0).map((_, idx) => ({
                key: idx === 1 ? '1' : 'N0',
                value: idx === 1 ? '1' : 'N0',
                text: idx === 1 ? 'Yes' : 'No',
            }))} />
        },
        {
            title: "처리",
            align: "center",
            render: (date) => {

                return <Button type="primary">저장</Button>

            }
        },
    ]
};
export { getColumns };
