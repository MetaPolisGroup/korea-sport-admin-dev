import React from 'react'
import { Button, Col, Row, Space, Switch } from 'antd'
import partnerApi, { IPartnerManageMent, PartnerFormRef, PartnerUpsertDto } from '../../../../api/partnersApi'
import Components from '../../../../components'
import Form from 'antd/es/form'
import { queryBuilderFunc } from '../../../../service/queryFunction'
import Utils from '../../../../utils'
import { PopupRef } from '../../../../components/Popup'

interface IFormEdit {
    partners: IPartnerManageMent[],
    popup: React.RefObject<PopupRef>,
    isEdit?: boolean,
    value?: PartnerUpsertDto
}

interface IBankBook {
    user_id: string;
    id?: string;
    title: string;
    content?: string;
    created_at?: number;
    updated_at?: number;
    delete: boolean;
    deleted_at?: number;
}

let groupedGames: any[] = [];

const FormEditRef: React.ForwardRefRenderFunction<PartnerFormRef, IFormEdit> = (props, ref) => {
    const { partners, isEdit, popup, value } = props
    const [form] = Form.useForm()
    const [bankbook, setBankBook] = React.useState<IBankBook[]>([])
    const [isShow, setIsShow] = React.useState({
        distribution: false,
        rolling: false
    })

    React.useEffect(() => {
        (async () => await queryBuilderFunc('bankbooks', [['delete', '==', false]], undefined, undefined, data => setBankBook(data as IBankBook[])))()
    }, [])

    React.useImperativeHandle(ref, () => ({
        onSubmit: function handleSubmit<PartnerUpsertDto>(
            onFinish: (value?: PartnerUpsertDto) => void) {
            form.validateFields().then((value: PartnerUpsertDto) => {
                onFinish(value)
            })
        }
    }))

    return (
        <Form layout='vertical' form={form}>
            <Space>
                <Components.Input.Select style={{ minWidth: 140 }} label='상위파트너' name='top_partner' data={partner_top} initialValue={value?.top_partner} />
                <Components.Input.Text label='파트너코드' name='partner_code' disabled={isEdit} rules={isRequired} initialValue={value?.partner_code} />
                <Components.Input.Text label='비밀번호' name='password' disabled={isEdit} rules={isRequired} initialValue={value?.password} />
                <Components.Input.Select style={{ minWidth: 140 }} label='통장설정' name='bankbook_setting' initialValue={value?.bankbook_setting}
                    rules={isRequired}
                    data={bankbook.map(a => ({
                        key: a.id,
                        value: a.id,
                        text: a.title,
                    }))} />
            </Space>
            <Space>
                <Components.Input.Text label='파트너명' name='partner_name' rules={isRequired} initialValue={value?.partner_name} />
                <Components.Input.Text label='가입코드' name='sub_code' rules={isRequired} initialValue={value?.sub_code} />
                <Components.Input.Text label='모바일' name='phone' initialValue={value?.phone} />
                <Form.Item label='차단' name='block' valuePropName='checked' initialValue={value?.block}>
                    <Switch />
                </Form.Item>
            </Space>
            <Space>
                <Components.Input.Select style={{ minWidth: 155 }} label='가입첫충전' name='signup_firstcharge'
                    data={data(true)} initialValue={value?.signup_firstcharge} />
                <Components.Input.Select style={{ minWidth: 155 }} label='매일첫충' name='first_bullet_everyday'
                    data={data(true)} initialValue={value?.first_bullet_everyday} />
                <Components.Input.Select style={{ minWidth: 155 }} label='매충전' name='every_charge'
                    data={data(true)} initialValue={value?.every_charge} />
                <Components.Input.Select style={{ minWidth: 155 }} label='추천인' name='recommender'
                    data={data(false)} initialValue={value?.recommender} />
            </Space>
            <Space>
                <Components.Input.Select style={{ minWidth: 155 }} label='출금타입' name='withdraw_type'
                    data={withdraw} initialValue={value?.withdraw_type} />
                <Components.Input.Select style={{ minWidth: 155 }} label='은행' name='bank'
                    data={bank} initialValue={value?.bank.name} />
                <Components.Input.Text style={{ minWidth: 155 }} initialValue={value?.bank.account_number} label='계좌번호' name='account_number' />
                <Components.Input.Text style={{ minWidth: 155 }} label='예금주' initialValue={value?.bank.account_holer} name='account_holer' />
            </Space>
            <Space>
                <Components.Input.Select style={{ minWidth: 155 }} label='유저지급' name='user_payment'
                    data={data(false)} initialValue={value?.user_payment} />
                <Components.Input.Select style={{ minWidth: 155 }} label='유저회수' name='user_recall'
                    data={data(false)} initialValue={value?.user_recall} />
                <Components.Input.Select style={{ minWidth: 155 }} label='하부지급' name='lower_payment'
                    data={data(false)} initialValue={value?.lower_payment} />
                <Components.Input.Select style={{ minWidth: 155 }} label='하부회수' name='lower_recovery'
                    data={data(false)} initialValue={value?.lower_recovery} />
            </Space>
            <Components.Input.TextArea label='회원가입 메세지' name='join_message' initialValue={value?.join_message} />
            <label style={{ marginRight: 20 }}>정산방식:</label>
            <Space>
                <Components.Input.Checkbox label='수익배분' onChange={e => setIsShow({ ...isShow, distribution: e })} />
                <Components.Input.Checkbox label='롤링' onChange={e => setIsShow({ ...isShow, rolling: e })} />
            </Space>
            {isShow.distribution && <div style={{ display: 'flex', gap: 20 }}>
                <label>수익배분 요율:</label>
                <Components.Input.Text type='number' name='revenue_share_rate' initialValue={value?.revenue_share_rate} />
            </div>}
            <div style={{ display: 'flex', gap: 20 }}>
                <Components.Input.Text label='공배팅-CA' name='ball_betting_CA' initialValue={value?.ball_betting_CA} />
                <Components.Input.Text label='공배팅-SLOT' name='ball_betting_slot' initialValue={value?.ball_betting_slot} />
            </div>
            <Row>
                <Col span={6}>
                    스포츠 롤링
                </Col>
                <Col span={18}>

                    <Space>
                        {Array(6).fill(0).map((_, idx) => {
                            return <Components.Input.Text initialValue={value?.sports_rolling[idx].value} key={idx} label={idx !== 5 ? idx + 1 + '폴더' : idx + 1 + '폴더이상'} name={'sport' + idx} />
                        })}
                    </Space>
                </Col>
                <Col span={6}>
                    라이브 롤링
                </Col>
                <Col span={18}>
                    <Space>
                        {Array(6).fill(0).map((_, idx) => {
                            return <Components.Input.Text key={idx} initialValue={value?.live_rolling[idx].value} label={idx !== 5 ? idx + 1 + '폴더' : idx + 1 + '폴더이상'} name={'live' + idx} />
                        })}
                    </Space>
                </Col>
                <Col span={6}>
                    게임 롤링
                </Col>
                <Col span={18}>
                    {groupedGames.map((group, index) => (
                        <React.Fragment key={index}>
                            <Space>
                                {group.map((game: { name: string, label: string }, idx: number) => (
                                    <Components.Input.Text
                                        key={game.name}
                                        label={game.label}
                                        name={game.name}
                                        initialValue={value?.game_rolling[idx].value}
                                    />
                                ))}
                            </Space>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
            <Components.Input.TextArea label='메모' name='memo' initialValue={value?.memo} />
            <Space style={{ width: '100%', justifyContent: 'end', borderTop: '1px solid gray', paddingTop: 10 }}>
                <Button htmlType="submit">닫기</Button>
                <Button htmlType="submit" type='primary' onClick={() => {
                    form.validateFields().then((e: PartnerUpsertDto) => {
                        const sports_rolling = convertArray('sport', e)
                        const live_rolling = convertArray('live', e)
                        const game_rolling = games.map((a, idx) => ({
                            name: a.label,
                            value: e[`game${idx + 1}`]
                        }))
                        const bank = {
                            account_holer: e.account_holer,
                            account_number: e.account_number,
                            name: e.bank
                        }
                        let settlement_method
                        if (isShow.distribution)
                            settlement_method = 'Profit distribution'
                        else if (isShow.rolling)
                            settlement_method = 'Rolling'
                        else if (isShow.distribution && isShow.rolling)
                            settlement_method = 'Profit distribution + Rolling'
                        else
                            settlement_method = 'None'

                        const body = {
                            top_partner: e.top_partner,
                            partner_code: e.partner_code,
                            password: e.password,
                            bankbook_setting: e.bankbook_setting,
                            partner_name: e.partner_name,
                            sub_code: e.sub_code,
                            phone: e.phone,
                            block: e.block,
                            signup_firstcharge: e.signup_firstcharge,
                            first_bullet_everyday: e.first_bullet_everyday,
                            every_charge: e.every_charge,
                            recommender: e.recommender,
                            withdraw_type: e.withdraw_type,
                            bank,
                            user_payment: e.user_payment,
                            user_recall: e.user_recall,
                            lower_payment: e.lower_payment,
                            lower_recovery: e.lower_recovery,
                            join_message: e.join_message,
                            settlement_method: settlement_method,
                            ball_betting_CA: e.ball_betting_CA,
                            ball_betting_slot: e.ball_betting_slot,
                            revenue_share_rate: e.revenue_share_rate,
                            sports_rolling: sports_rolling,
                            live_rolling,
                            game_rolling,
                            memo: e.memo,
                        }
                        partnerApi.branch(body as any).then(i => {
                            if (i)
                                Utils.notification.success('진실')
                            else
                                Utils.notification.error('실패한')
                        })
                        popup.current?.close()
                    })
                }}>저장</Button>
                <Button type='primary' danger>지점삭제</Button>
            </Space>
        </Form>
    )
}
const FormEdit = React.forwardRef<PartnerFormRef, IFormEdit>(FormEditRef)

export default FormEdit

const partner_top = [
    {
        key: "Headquarters",
        value: "Headquarters",
        text: "본부",
    },
    {
        key: "Sub-headquarters",
        value: "Sub-headquarters",
        text: "하위 본부",
    },
    {
        key: "Distributor",
        value: "Distributor",
        text: "유통 업체",
    },
    {
        key: "Agency",
        value: "Agency",
        text: "대행사",
    },
    {
        key: "Store",
        value: "Store",
        text: "가게",
    },
]

const data = (isCheck: boolean) => {
    return Array(2).fill(0).map((_, idx) => ({
        key: idx === 0 ? true : false,
        value: idx === 0 ? true : false,
        text: isCheck ? idx === 0 ? '지급' : '미지급' : idx === 0 ? '가능' : '불가능'
    }))
}

const convertArray = (name: string, e: PartnerUpsertDto) => Array(6).fill(0).map((_, idx) => {
    const fieldName: any = `${name + idx}`;
    return {
        name: idx + 1 + 'folders',
        value: e[fieldName]
    }
})

const isRequired = [{ required: true, message: '이 학교는 사라져야합니다' }]

const games = [
    { label: '로투스홀짝', name: 'game1' },
    { label: '로투스 바카라', name: 'game2' },
    { label: '파워볼', name: 'game3' },
    { label: '파워사다리', name: 'game4' },
    { label: '키노사다리', name: 'game5' },
    { label: '스피드키노', name: 'game6' },
    { label: '가상축구', name: 'game7' },
    { label: '개경주', name: 'game8' },
    { label: 'LIVE CASINO', name: 'game9' },
    { label: '슬롯게임', name: 'game10' },
    { label: '보스코어1분파워볼', name: 'game11' },
    { label: '코인 파워볼 3분', name: 'game12' },
    { label: '코인 파워볼 5분', name: 'game13' },
    { label: '코인 파워사다리 3분', name: 'game14' },
    { label: '코인 파워사다리 5분', name: 'game15' },
    { label: '벳이스트 축구', name: 'game16' },
    { label: '벳이스트 야구', name: 'game17' },
    { label: '벳이스트 농구', name: 'game18' },
    { label: '벳이스트 크리켓', name: 'game19' },
    { label: '벳이스트 주사위', name: 'game20' },
    { label: '강원랜드바카라', name: 'game21' },
    { label: '라스베가스바카라', name: 'game22' },
    { label: '오야붕섯다', name: 'game23' },
    { label: '마리오레이싱', name: 'game24' },
    { label: '붐붐붐사다리', name: 'game25' },
    { label: 'FX비트코인', name: 'game26' },
];

for (let i = 0; i < games.length; i += 4) {
    groupedGames.push(games.slice(i, i + 4));
}

const withdraw = [
    {
        key: "Withdrawal only",
        value: "Withdrawal only",
        text: "출금만 가능",
    },
    {
        key: "Only payable to users",
        value: "Only payable to users",
        text: "유저에게 지급만 가능",
    },
    {
        key: "Withdrawal + user",
        value: "Withdrawal + user",
        text: "출금 + 유저",
    },
    {
        key: "Impossible",
        value: "Impossible",
        text: "불가능",
    },
]

const bank = [
    {
        key: "'신한",
        value: "'신한",
        text: "'신한",
    },
    {
        key: "국민",
        value: "국민",
        text: "국민",
    },
    {
        key: "농협",
        value: "농협",
        text: "농협",
    },
    {
        key: "우리",
        value: "우리",
        text: "우리",
    },
    {
        key: "하나",
        value: "하나",
        text: "하나",
    },
    {
        key: "제일",
        value: "제일",
        text: "제일",
    },
    {
        key: "기업",
        value: "기업",
        text: "기업",
    },
    {
        key: "우체국",
        value: "우체국",
        text: "우체국",
    },
    {
        key: "경남",
        value: "경남",
        text: "경남",
    },
    {
        key: "광주",
        value: "광주",
        text: "광주",
    },
    {
        key: "대구",
        value: "대구",
        text: "대구",
    },
    {
        key: "부산",
        value: "부산",
        text: "부산",
    },
    {
        key: "산림",
        value: "산림",
        text: "산림",
    },
    {
        key: "산업",
        value: "산업",
        text: "산업",
    },
    {
        key: "수협",
        value: "수협",
        text: "수협",
    },
    {
        key: "지역농축협",
        value: "지역농축협",
        text: "지역농축협",
    },
    {
        key: "전북",
        value: "전북",
        text: "전북",
    },
    {
        key: "제주",
        value: "제주",
        text: "제주",
    },
    {
        key: "씨티",
        value: "씨티",
        text: "씨티",
    },
    {
        key: "새마을",
        value: "새마을",
        text: "새마을",
    },
    {
        key: "신용협동",
        value: "신용협동",
        text: "신용협동",
    },
    {
        key: "카카오뱅크",
        value: "카카오뱅크",
        text: "카카오뱅크",
    },
];