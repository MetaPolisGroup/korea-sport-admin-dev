import { Button, Form, Tag, } from "antd"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import React from "react"
import bettingApi, { IBettingElement, IResponseBet } from "../../../../api/bettingApi"
import Input from "../../../../components/Input"
import { formatDateTime } from "../../../../components/Input/DatePicker"
import { PopupConfirm, PopupRef } from "../../../../components/Popup"
import Utils from "../../../../utils"

const getColumns = (
    item: IResponseBet,
): ColumnsType<IBettingElement> => {
    const [form] = Form.useForm()
    const option = [
        { key: 'Waiting', value: 'Waiting', text: '대기' },
        { key: 'Cancel', value: 'Cancel', text: '적중' },
        { key: 'Win', value: 'Win', text: '미적중' },
        { key: 'Lose', value: 'Lose', text: '적특' },
        { key: 'Draw', value: 'Draw', text: '그리다' },
        { key: 'Half win', value: 'Half win', text: '반 승리' },
        { key: 'Half lose', value: 'Half lose', text: '반 손실' },

    ]
    return [
        {
            title: '관리자수정',
            width: 100,
            align: 'center',
            render: (_, data, index) => index + 1,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.created_at - b.created_at,
        },
        {
            title: '경기시간',
            width: 200,
            align: 'left',
            render: (_, data) => <p >{dayjs(Number(data.time) * 1000).format(formatDateTime)}</p>
        },
        {
            title: '리그',
            width: 200,
            align: 'left',
            dataIndex: 'title',
            key: 'title',
            render: (_, data) => <p>{data.league}</p>
        },
        {
            title: '홈',
            width: 200,
            align: 'center',
            render: (_, data) => <p>{data.home_team}</p>
        },
        {
            title: '원정',
            width: 200,
            align: 'center',
            render: (_, data) => <p>{data.away_team}</p>
        },
        {
            title: '경기타입',
            width: 200,
            align: 'center',
            render: (_, data) => <p>{data.odd_type}</p>
        },
        {
            title: '베팅팀/종류/기준',
            width: 200,
            align: 'center',
            render: (_, data) => <p>{data.odd.team}</p>
        },
        {
            title: '진행상태',
            width: 200,
            align: 'center',
            render: (_, data) => {
                let text
                switch (data.match_status) {
                    case '0':
                        text = '시작하지 마십시오'
                    case '3':
                        text = '끝났다'
                    default:
                        break;
                }
                return <Tag>{text ?? '--'}</Tag>
            }
        },
        {
            title: '스코어',
            width: 200,
            align: 'center',
            render: (_, data) => <p>{data.score ?? '--'}</p>
        },
        {
            title: '배당률',
            width: 200,
            align: 'left',
            render: (_, data) => <p>{data.odd.odds ?? '--'}</p>
        },
        {
            title: '베팅결과',
            width: 200,
            align: 'center',
            render: (_, data, idx) => <Form form={form}>
                <Input.Select
                    data={option}
                    initialValue={data.bet_result}
                    name={'bet_result' + idx}
                    label=''
                />
            </Form>
        },
        {
            title: '설정',
            width: 200,
            align: 'center',
            fixed: 'right',
            render: (_, data, idx) => {
                const btnSaveRef = React.createRef<PopupRef>()
                return <PopupConfirm
                    ref={btnSaveRef}
                    onSubmit={() => {
                        form.validateFields().then((i:any) => {
                            const req = i[`bet_result${idx}`]
                            bettingApi.saveBettingHistory({
                                FI: data.match_id,
                                betslip: [{ betResult: req, id: item.id! }]
                            }).then(i => {
                                btnSaveRef.current?.close()
                                if (i)
                                    return Utils.notification.success('성공')
                                Utils.notification.error('fail')
                            })
                        })
                    }}
                    selector={<Button type="primary" onClick={() => btnSaveRef.current?.open()}>
                        구하다
                    </Button >}
                    title={'구하다'}
                    content={<p> 당신은 확실히 저장해야합니다</p >}

                />
            }
        },
    ]
}
export { getColumns }