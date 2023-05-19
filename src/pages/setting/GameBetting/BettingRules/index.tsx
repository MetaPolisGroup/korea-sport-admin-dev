import React from 'react'
import type { FormInstance } from 'antd/es/form'
import { IGameSpecificDto } from '../../../../api/settingApi'
import { IBettingRules } from '../../Basic/BettingCancel/data'
import Components from '../../../../components'

interface IGameBettingProps {
    data: IBettingRules
    form: FormInstance<IGameSpecificDto>
}

const BettingRules: React.FC<IGameBettingProps> = ({ data }) => {
    return (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }} className='wraper-betting-game'>
            <Components.Input.Select
                label='게임을선택하세요'
                initialValue={data.game}
                disabled
                name='game' data={Array(1).fill(0).map((_, idx) => ({
                    key: 'sports',
                    data: 'sports',
                    text: 'Sport'
                }))} />
            <Components.Input.Select
                label='베팅가능'
                initialValue={data.betting_available}
                disabled
                name='betting_available' data={optionsTF} />
            <Components.Input.Text
                label='베팅중지MSG'
                name='stop_betting_message'
                disabled
                initialValue={data.stop_betting_message}
            />

            <Components.Input.Select
                label='베팅마감초'
                initialValue={data.betting_closing}
                name='betting_closing' data={Array(10).fill(0).map((_, idx) => ({
                    key: idx + 1,
                    data: idx + 1,
                    text: idx + 1 + " Second"
                }))} />
            {/* <Components.Input.Select
                label='중복베팅수'
                initialValue={data.number_duplicate_bets}
                name='number_duplicate_bets' data={Array(10).fill(0).map((_, idx) => ({
                    key: idx + 1,
                    data: idx + 1,
                    text: idx + 1 + " time"
                }))} /> */}
            <Components.Input.Select
                label='최대베팅 폴더수'
                initialValue={data.number_items_betslip}
                name='number_items_betslip' data={Array(10).fill(0).map((_, idx) => ({
                    key: idx + 1,
                    data: idx + 1,
                    text: idx + 1 + " folders"
                }))} />
            <Components.Input.Select
                label='다폴더보너스 여부'
                name='available' data={optionsTF}
                initialValue={data.bonus.available}
            />
            <Components.Input.Text
                label='최소배당'
                type='number'
                initialValue={data.min_odd_bet}
                name='min_odd_bet'
            />

            <Components.Input.Text
                label='3폴더'
                name='three'
                type='number'
                initialValue={data.bonus.three}
            />
            <Components.Input.Text
                label='5폴더'
                name='five'
                type='number'
                initialValue={data.bonus.five}
            />
            <Components.Input.Text
                label='7폴더'
                name='seven'
                type='number'
                initialValue={data.bonus.seven}
            />
            {/* <Components.Input.Select
                label='로그인전 배당조정(%)'
                initialValue={data.odd_before_login}
                name='odd_before_login' data={Array(10).fill(0).map((_, idx) => ({
                    key: idx + 1,
                    data: idx + 1,
                    text: idx + 1 + "%"
                }))} /> */}
            <Components.Input.Select
                label='당첨금자동지급'
                name='auto_pay_bet'
                data={optionsTF}
                initialValue={data.auto_pay_bet}
                disabled
            />
            {/* <Components.Input.Select
                label='롤링금액(%)'
                name='rolling_amount'
                initialValue={data.rolling_amount}
            /> */}
        </div>
    )
}

const optionsTF = [
    {
        key: true,
        value: true,
        text: 'Yes'
    },
    {
        key: false,
        value: false,
        text: 'No'
    },
]

export default BettingRules