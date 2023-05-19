import React from 'react'
import Components from '../../..'
import { IUser } from '../../../../features/auth'

interface IMoneyProps {
    user: IUser,
    partner: IUser[],
}

const Money: React.FC<IMoneyProps> = props => {
    const { partner, user } = props

    return (
        <React.Fragment>
            <h2>머니정보</h2>
            <div className='item-div'>
                <label>보유머니</label>
                <Components.Input.Text initialValue={user.balance} name='balance' />
            </div>
            <div className='item-div'>
                <label>포인트</label>
                <Components.Input.Text initialValue={user.point} name='point' />
            </div>
            <div className='item-div'>
                <label>누적입금</label>
                <span>{user.cumulative_deposit}</span>
            </div>
            <div className='item-div'>
                <label>누적출금</label>
                <span>{user.cumulative_withdraw}</span>
            </div>
            <div className='item-div'>
                <label>누적출금</label>
                <span>--</span>
            </div>
            <div className='item-div'>
                <label>누적정산</label>
                <span>{user.cumulative_settlement}</span>
            </div>
        </React.Fragment>
    )
}

export default Money