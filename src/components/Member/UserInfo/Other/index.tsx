import Form from 'antd/es/form'
import Switch from 'antd/es/switch'
import dayjs from 'dayjs'
import React from 'react'
import Components from '../../..'
import { IUser } from '../../../../features/auth'
import { formatDateTime } from '../../../Input/DatePicker'

interface IOtherProps {
    user: IUser,
    partner: IUser[],
 }

const Other: React.FC<IOtherProps> = props => {
    const { partner, user } = props

    return (
        <React.Fragment>
             <h2>기타정보</h2>
                    <div className='item-div'>
                        <span>유저타입</span>
                        <Components.Input.Select label='' initialValue='일반' name='user_type1' data={Array(2).fill(0).map((a, b) => ({
                            key: b === 1 ? 'common' : 'test',
                            value: b === 1 ? 'common' : 'test',
                            text: b === 1 ? '일반' : '테스트'
                        }))} />
                    </div>
                    <div className='item-div'>
                        <span>통장설정</span>
                        <Components.Input.Select label='' initialValue='--' name='user_type2' data={[]} />
                    </div>
                    <div className='item-div'>
                        <span>입/출 PINN코인사용</span>
                        <Components.Input.Select label='' initialValue='--' name='user_type3' data={[]} />
                    </div>
                    <div className='item-div'>
                        <span>PINN Wallet 주소</span>
                        <Components.Input.Text label='' initialValue='--' name='pin_wallet' />
                    </div>
                    <div className='item-div'>
                        <span>최근로그인 / IP / </span>
                        <span>{dayjs(user.last_login_at).format(formatDateTime)}</span>
                    </div>
                    <div className='item-div'>
                        <span>가입일 / 아이피</span>
                        <span>{dayjs(user.created_at).format(formatDateTime)}</span>
                    </div>
                    <div className='item-div'>
                        <span>가입URL</span>
                        <span>--</span>
                    </div>
                    <div className='item-div'>
                        <span>연락처</span>
                        <Components.Input.Text label='' initialValue='--' name='contact' />
                    </div>
                    <div className='item-div'>
                        <Components.Input.Text label='추천인' name='recommend_id' initialValue={user.recommend_id} />
                        <div className='child'>
                            <label>추천인 가능여부</label>
                            <Form.Item name='recommender_available' initialValue={user.recommender_available} valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </div>
                    </div>
                    <b>은행정보</b>
                    <div className='item-div'>
                        <div className='child'>
                            <Components.Input.Text label='은행' name='bank' initialValue='--' />
                            <Components.Input.Text label='계좌번호' name='account_number' initialValue='--' />
                            <Components.Input.Text label='예금주' name='account_holder' initialValue='--' />
                        </div>
                    </div>
                    <b>포인트 지급셋팅</b>
                    <div className='item-div'>
                        <div className='child'>
                            <Form.Item label='가입 첫충 지급' name='subscription' valuePropName='checked'><Switch /></Form.Item>
                            <Form.Item label='매일 첫충 지급' name='everyday' valuePropName='checked'><Switch /></Form.Item>
                            <Form.Item label='매충 지급' name='payment' valuePropName='checked'><Switch /></Form.Item>
                        </div>
                    </div>
                    <b>추천인 포인트 지급셋팅</b>
                    <div className='item-div'>
                        <div className='child'>
                            <Form.Item label='가입 첫충 지급' name='referral_subscription' valuePropName='checked'><Switch /></Form.Item>
                            <Form.Item label='매일 첫충 지급' name='referral_everyday' valuePropName='checked'><Switch /></Form.Item>
                            <Form.Item label='매충 지급' name='referral_payment' valuePropName='checked'><Switch /></Form.Item>
                        </div>
                    </div>
                    <div className="item-div">
                        <div>
                            <Form.Item label='개인입금계좌-1' name='deposit_account1' valuePropName='checked'><Switch /></Form.Item>
                            <div className='child'>
                                <Components.Input.Text label='은행' name='deposit_account1_bank' initialValue='--' />
                                <Components.Input.Text label='계좌번호' name='deposit_account1_account_number' initialValue='--' />
                                <Components.Input.Text label='예금주' name='deposit_account1_account_holder' initialValue='--' />
                            </div>
                        </div>
                    </div>
                    <div className="item-div">
                        <div>
                            <Form.Item label='개인입금계좌-2' name='deposit_account2' valuePropName='checked'><Switch /></Form.Item>
                            <div className='child'>
                                <Components.Input.Text label='은행' name='deposit_account2_bank' initialValue='--' />
                                <Components.Input.Text label='계좌번호' name='deposit_account2_account_number' initialValue='--' />
                                <Components.Input.Text label='예금주' name='deposit_account2_account_holder' initialValue='--' />
                            </div>
                        </div>
                    </div>
        </React.Fragment>
    )
}

export default Other