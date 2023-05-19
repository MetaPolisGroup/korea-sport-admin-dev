import type { ColumnsType } from "antd/es/table";
import Input from "../../../../components/Input";
import { IRuleByLevel } from "../../Basic/BettingCancel/data";

const getColumns = (

): ColumnsType<IRuleByLevel> => [
        {
            title: '수준',
            align: 'center',
            width: 100,
            key: 'level',
            dataIndex: 'level',
            render: (_, data, idx) => <Input.Text type="number" name={'level' + idx} initialValue={data.level} />
        },
        // {
        //     title: '회원 낙첨 P(%)',
        //     align: 'center',
        //     width: 100,
        //     key: 'member_lost',
        //     dataIndex: 'member_lost',
        //     render: (_, data, idx) => <Input.Text type="number" name={'member_lost' + idx} initialValue={data.member_lost} />
        // },
        // {
        //     title: '추천인 낙첨 P(%)',
        //     align: 'center',
        //     width: 100,
        //     key: 'referrer_lost',
        //     dataIndex: 'referrer_lost',
        //     render: (_, data, idx) => <Input.Text type="number" name={'referrer_lost' + idx} initialValue={data.referrer_lost} />
        // },
        // {
        //     title: '회원 롤링 P(%)',
        //     align: 'center',
        //     width: 100,
        //     key: 'member_rolling',
        //     dataIndex: 'member_rolling',
        //     render: (_, data, idx) => <Input.Text type="number" name={'member_rolling' + idx} initialValue={data.member_rolling} />
        // },
        // {
        //     title: '추천인 롤링 P(%)',
        //     align: 'center',
        //     width: 100,
        //     key: 'referrer_rolling',
        //     dataIndex: 'referrer_rolling',
        //     render: (_, data, idx) => <Input.Text type="number" name={'referrer_rolling' + idx} initialValue={data.referrer_rolling} />
        // },
        {
            title: '단폴 배팅액',
            align: 'center',
            width: 100,
            key: 'danpole_betting_amount',
            dataIndex: 'danpole_betting_amount',
            render: (_, data, idx) => <Input.Text type="number" name={'danpole_betting_amount' + idx} initialValue={data.danpole_betting_amount} />
        },
        // {
        //     title: '두폴 배팅액',
        //     align: 'center',
        //     width: 100,
        //     key: 'doupol_betting_amount',
        //     dataIndex: 'doupol_betting_amount',
        //     render: (_, data, idx) => <Input.Text type="number" name={'doupol_betting_amount' + idx} initialValue={data.doupol_betting_amount} />
        // },
        {
            title: '최소 배팅액',
            align: 'center',
            width: 100,
            key: 'min_bet',
            dataIndex: 'min_bet',
            render: (_, data, idx) => <Input.Text type="number" name={'min_bet' + idx} initialValue={data.min_bet} />
        },
        {
            title: '최대 배팅액',
            align: 'center',
            width: 100,
            key: 'max_bet',
            dataIndex: 'max_bet',
            render: (_, data, idx) => <Input.Text type="number" name={'max_bet' + idx} initialValue={data.max_bet} />
        },
        {
            title: '최대 당첨금',
            align: 'center',
            width: 100,
            key: 'max_winning',
            dataIndex: 'max_winning',
            render: (_, data, idx) => <Input.Text type="number" name={'max_winning' + idx} initialValue={data.max_winning} />
        },
        {
            title: '레벨별 유저배당조정(%)',
            align: 'center',
            width: 100,
            key: 'odd_by_level',
            dataIndex: 'odd_by_level',
            render: (_, data, idx) => <Input.Text type="number" name={'odd_by_level' + idx} initialValue={data.odd_by_level} />
        },
        // {
        //     title: '최대배당',
        //     align: 'center',
        //     width: 100,
        //     key: 'max_dividend',
        //     dataIndex: 'max_dividend',
        //     render: (_, data, idx) => <Input.Text type="number" name={'max_dividend' + idx} initialValue={data.max_dividend} />
        // },
        {
            title: '일일 취소 횟수',
            align: 'center',
            width: 100,
            key: 'cancel_bet_day',
            dataIndex: 'cancel_bet_day',
            render: (_, data, idx) => <Input.Text type="number" name={'cancel_bet_day' + idx} initialValue={data.cancel_bet_day} />
        },

    ]

export { getColumns };
