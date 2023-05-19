import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { IDepositData } from "../../../../api/payment";
import { IUser } from "../../../../features/auth";
import Utils from "../../../../utils";
import Box from "../../../Box";
import { formatDateTime } from "../../../Input/DatePicker";

const getColumns = (): ColumnsType<IUser> => {

    return [
        {
            title: "상태",
            width: 10,
            align: "center",
            key: 'situation',
            dataIndex: 'situation'
        },
        {
            title: "유저 아이디",
            width: 10,
            align: "center",
            key: 'id',
            dataIndex: 'id'
        },
        {
            title: "입금",
            width: 10,
            align: "center",
            key: 'cumulative_deposit',
            dataIndex: 'cumulative_deposit'
        },
        {
            title: "출금",
            width: 10,
            align: "center",
            key: 'cumulative_withdraw',
            dataIndex: 'cumulative_withdraw'
        },
        {
            title: "입금 - 출금",
            width: 10,
            align: "center",
            key: 'cumulative_settlement',
            dataIndex: 'cumulative_settlement',

        },
        {
            title: "베팅",
            width: 10,
            align: "center",
            render: (a, b) => <Box<IDepositData[]>
                id={b.id!}
                collectionName='bets'
                fieldsId={true}
                filters={[['user_id', '==', b.id!]]}
                render={(value) => {
                    const totalAmount = value?.reduce((accumulator: number, item: IDepositData) => accumulator + item.amount, 0);
                    return <p>{Utils.convertCurrencyWithCommas(totalAmount)}</p>
                }}
            />

        },
        {
            title: "WIN",
            width: 20,
            align: "center",
            render: (a, b) => <Box<IDepositData[]>
                id={b.id!}
                collectionName='bets'
                fieldsId={true}
                filters={[['user_id', '==', b.id!], ['status', '==', 'Win']]}
                render={(value) => {
                    const totalWinningAmount = value?.reduce((accumulator: number, item: IDepositData) => accumulator + item.winning_amount!, 0);
                    return <p>{Utils.convertCurrencyWithCommas(totalWinningAmount)}</p>
                }}
            />

        },
        {
            title: "베팅 - WIN",
            width: 20,
            align: "center",
            render: (a, b) => <Box<IDepositData[]>
                id={b.id!}
                collectionName='bets'
                fieldsId={true}
                filters={[['user_id', '==', b.id!]]}
                render={(value) => {
                    const totalAmount = value?.reduce((accumulator: number, item: IDepositData) => accumulator + item.amount, 0);
                    const totalWinningAmount = value?.reduce((accumulator: number, item: IDepositData) => accumulator + item.winning_amount!, 0);
                    const bettingWin = totalAmount - totalWinningAmount;
                    return <p>{Utils.convertCurrencyWithCommas(bettingWin)}</p>;
                }}
            />
        },
        {
            title: "보유머니",
            width: 10,
            align: "center",
            key: 'balance',
            dataIndex: 'balance',
            render: (a) => <p>{Utils.convertCurrencyWithCommas(a)}</p>
        },
        {
            title: "콤프설정",
            width: 10,
            align: "center",
            render: (a) => <p>--</p>
        },
    ]
};
export { getColumns };
