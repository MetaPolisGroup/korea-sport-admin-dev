import Rubylevel from './Rubylevel'
import BettingRules from './BettingRules'
import Form from 'antd/es/form'
import { IDataResponsSetting } from '../Basic/BettingCancel/data'
import setting, { IGameSpecificDto } from '../../../api/settingApi'
import React from 'react'
import { getAllDocuments } from '../../../service/queryFunction'
import Button from 'antd/es/button'
import Utils from '../../../utils'
import './index.scss'
const GameBetting = () => {
    const [data, setData] = React.useState<IDataResponsSetting>()
    const [form] = Form.useForm<IGameSpecificDto>()

    React.useEffect(() => {
        (async () => await getAllDocuments('preferences', value => setData(value[0] as IDataResponsSetting)))()
    }, [])

    return (
        <React.Fragment>
            {data && <Form form={form} onFinish={(e: IGameSpecificDto) => (handleSubmit(e, data))} layout='vertical'>
                <BettingRules data={data.betting_rules} form={form} />
                <Rubylevel data={data.betting_rules} />
                <Button htmlType='submit'>로그인</Button>
            </Form>}
        </React.Fragment>
    )
}

export default GameBetting

const handleSubmit = (value: IGameSpecificDto, data: IDataResponsSetting) => {
    const RuleByLevel = data?.betting_rules.rules_by_level?.map(((_, idx) => ({
        cancel_bet_day: value[`cancel_bet_day${idx}`] ?? 0,
        danpole_betting_amount: value[`danpole_betting_amount${idx}`] ?? 0,
        doupol_betting_amount: value[`doupol_betting_amount${idx}`] ?? 0,
        level: value[`level${idx}`] ?? 0,
        max_bet: value[`max_bet${idx}`] ?? 0,
        max_dividend: value[`max_dividend${idx}`] ?? 0,
        max_winning: value[`max_winning${idx}`] ?? 0,
        member_lost: value[`member_lost${idx}`] ?? 0,
        member_rolling: value[`member_rolling${idx}`] ?? 0,
        min_bet: value[`min_bet${idx}`] ?? 0,
        odd_by_level: value[`odd_by_level${idx}`] ?? 0,
        referrer_lost: value[`referrer_lost${idx}`] ?? 0,
        referrer_rolling: value[`referrer_rolling${idx}`] ?? 0,
    })))
    const body = {
        auto_pay_bet: value.auto_pay_bet ?? 0,
        betting_available: value.betting_available ?? 0,
        betting_closing: value.betting_closing ?? 0,
        bonus: {
            available: value.available ?? 0,
            five: value.five ?? 0,
            seven: value.seven ?? 0,
            three: value.three ?? 0
        },
        game: value.game,
        min_odd_bet: value.min_odd_bet,
        number_duplicate_bets: value.number_duplicate_bets ?? 0,
        number_items_betslip: value.number_items_betslip ?? 0,
        odd_before_login: value.odd_before_login ?? 0,
        rolling_amount: value.rolling_amount ?? 0,
        stop_betting_message: value.stop_betting_message ?? true,
        rules_by_level: RuleByLevel,
    }
    setting.gamespecific(body as IGameSpecificDto).then(i => {
        if (i)
            return Utils.notification.success('성공')

        Utils.notification.error('실패한')
    })
}