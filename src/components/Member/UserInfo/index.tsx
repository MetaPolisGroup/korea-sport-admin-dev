import { Button, Col, Form, Input, Row, Space, Switch } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import authApi from '../../../api/authApi'
import { useAppSelector } from '../../../app/hook'
import Components from '../..'
import { formatDateTime } from '../../Input/DatePicker'
import { PopupRef } from '../../Popup'
import { IUser } from '../../../features/auth'
import Utils from '../../../utils'
import './index.scss'
import Basic from './Basic'
import Memo from './Memo'
import Other from './Other'
import Money from './Money'
interface IUserProps {
    user: IUser,
    partner: IUser[],
    popupRef: React.RefObject<PopupRef>

}


const Info: React.FC<IUserProps> = props => {
    const { user, partner } = props
    const { id } = useAppSelector(state => state.auth.auth)

    const handleSubmit = (e: any) => {
        authApi.update({
            edit: {
                id: user.id!,
                level: e.level,
                point: e.point,
                role: user.role!,
                bank: {
                    bank_name: user.bank?.bank_name!,
                    account_holder: user.bank?.account_holder!,
                    account_number: user.bank?.account_holder!
                },
                partner_id: e.partner_id!,
                nickname: e.nickname!,
                social_number: e.social_number!,
                agency: e.angency,
                ability: e.ability,
                ability_customer: e.ability_customer,
                ability_registration: e.ability_registration,
                signle_ability_amount: e.signle_ability_amount,
                signle_ability: e.signle_ability,
                double_ability: e.double_ability,
                double_ability_amount: e.double_ability_amount,
                cross_ability: e.cross_ability,
                cross_ability_amount: e.cross_ability_mount,
                minimum_betting_odd: e.minimum_betting_odd,
                password: e.password ?? '',
                phone: user.phone!,
                recommend_id: e.recommend_id ?? '',
                casino: e.casino,
                note:e.note,
                money_withdraw:e.money_withdraw,
                balance:e.balance,
                
                slot:e.slot
            },
            admin_id: id!,
            note: ''
        }).then(i => {
            if (i)
                Utils.notification.success('성공')
            else
                Utils.notification.error('성공')
        })
    }
    return (
        <Form onFinish={handleSubmit}>
            <Row gutter={24}>
                <Col span={12} >
                    <div>
                        <Basic partner={partner} user={user} />
                        <Money partner={partner} user={user} />
                    </div>
                </Col>
                <Col span={12}>
                    <Other partner={partner} user={user} />
                    <Memo partner={partner} user={user} />
                </Col>
            </Row>
            <Col span={24} style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <Button htmlType='submit'>변경사항 저장</Button>
                <Button onClick={() => {
                    authApi.block({
                        admin_id: id!,
                        status: 'Blocked',
                        user_id: user.id!,
                    }).then(i => {
                        if (i)
                            Utils.notification.success('성공')
                        else
                            Utils.notification.error('성공')
                    })
                }} danger type='primary'>차단</Button>
            </Col>
        </Form >
    )
}

export default Info