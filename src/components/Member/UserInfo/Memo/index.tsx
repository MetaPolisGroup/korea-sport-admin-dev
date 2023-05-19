import React from 'react'
import Components from '../../..'
import { IUser } from '../../../../features/auth'

interface IMemoProps {
    user: IUser,
    partner: IUser[],
}

const Memo: React.FC<IMemoProps> = props => {
    const { partner, user } = props

    return (
        <div style={{ marginTop: 35 }}>
            <h2>메모</h2>
            <label>메모를 적어주세요:</label>
            <Components.Input.TextArea label='' name='note' />
            <label>각 머니 충출금시 사유를 이곳에 적어주세요 (최대 250글자).</label>
            <Components.Input.TextArea label='' name='money_withdraw' />
        </div>
    )
}

export default Memo