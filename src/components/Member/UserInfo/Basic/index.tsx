import Form from 'antd/es/form'
import Switch from 'antd/es/switch'
import React from 'react'
import Components from '../../..'
import { IUser } from '../../../../features/auth'

interface IBasicProps {
    user: IUser,
    partner: IUser[],
}

const Basic: React.FC<IBasicProps> = props => {
    const { partner, user } = props
    return (
        <div>
            <h2>기본정보</h2>
            <div>
                <div className='item-div'>
                    <label>소속</label>
                    <Components.Input.Select style={{ width: 200 }} data={partner?.map(i => ({
                        key: i.id!,
                        value: i.id!,
                        text: i.nickname
                    }))} name='partner_id' label='' placeholder='소속파트너을 선택해 주세요' initialValue={user.partner_id} />
                </div>
                <div className='item-div'>
                    <span>상태:</span>
                    <span>{user.situation}</span>
                </div>

                <div className='item-div'>
                    <label>소속</label>
                    <Components.Input.Select style={{ width: 200 }} data={Array(5).fill(0).map((_, idx) => ({
                        key: idx + 1,
                        value: idx + 1,
                        text: `${idx + 1}`,
                    }))} name='level' label='' initialValue={user.level} placeholder='소속파트너을 선택해 주세요' />
                </div>
                <div className='item-div'>
                    <span>아이디:</span>
                    <span>{user.id}</span>
                </div>
                <div className='item-div' >
                    <span>닉네임:</span>
                    <Components.Input.Text label='' name='nickname' initialValue={user.nickname} />
                </div>
                <div className='item-div' >
                    <span>주민번호:</span>
                    <Components.Input.Text label='' name='social_number' />
                </div>
                <div className='item-div' >
                    <span>통신사:</span>
                    <Components.Input.Select label='' name='angency' data={[]} placeholder='New agency' />
                </div>
                <div className='item-div'>
                    <label>비밀번호:</label>
                    <Components.Input.Text name='password' label='' type='password' />
                </div>
                <div className='item-div'>
                    <span>마지막 비밀번호 변경일</span>
                    <span>변경이력 없음</span>
                </div>
                <div className='item-div'>
                    <span>이용 가능여부:</span>
                    <Form.Item valuePropName='checked' name='ability'>
                        <Switch />
                    </Form.Item>
                </div>
                <div className='item-div'>
                    <span>고객센터 문의 가능여부:</span>
                    <Form.Item valuePropName='checked' name='ability_customer'>
                        <Switch />
                    </Form.Item>
                </div>
                <div className='item-div'>
                    <span>게시글 등록 가능여부:</span>
                    <Form.Item valuePropName='checked' name='ability_registration'>
                        <Switch />
                    </Form.Item>
                </div>
                <div className='item-div'>
                    <div className='child'>
                        <label>단폴 가능여부:</label>
                        <Form.Item name='signle_ability' valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </div>
                    <Components.Input.Text label='제한금액' name='signle_ability_amount' />
                </div>

                <div className='item-div'>
                    <div className='child'>
                        <label>두폴 가능여부:</label>
                        <Form.Item name='double_ability' valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </div>
                    <Components.Input.Text label='제한금액' name='double_ability_amount' />
                </div>

                <div className='item-div'>
                    <div className='child'>
                        <label>크로스 가능여부:</label>
                        <Form.Item name='cross_ability' valuePropName="checked">
                            <Switch />
                        </Form.Item>
                    </div>
                    <Components.Input.Text label='제한금액' name='cross_ability_amount' />
                </div>
                <div className='item-div' >
                    <span>단폴 연속베팅 가능횟수:</span>
                    <Components.Input.Select label='' name='angency' data={[]} placeholder='New agency' />
                </div>
                <div className='item-div' >
                    <span>최소배팅배당:</span>
                    <Components.Input.Text label='최소배팅배당' name='minimum_betting_odd' />
                </div>
                <div className='item-div'>
                    <span>콤프(개별):</span>
                    <div className="child">
                        <Components.Input.Text label='카지노' name='casino' />
                        <Components.Input.Text label='슬롯' name='slot' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basic