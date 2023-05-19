import { Form, Space, Switch } from 'antd'
import React from 'react'
import { IPartnerManageMent } from '../../../../api/partnersApi'
import Components from '../../../../components'
import './index.scss'
interface ICreateProps {
    partners: IPartnerManageMent[]
}

const Create: React.FC<ICreateProps> = props => {
    const { partners } = props

    return (
        <Form className='form-wrapper'>
            <Components.Input.Select label='제휴 파트너:' name='' data={partners.map(u => ({
                key: u.id,
                value: u.id,
                text: u.name,
            }))} />
            <Components.Input.Text label='관리자 ID' name='' />
            <Components.Input.Text label='이름:' name='' />
            <Components.Input.Text label='비밀번호:' name='' />
            <Components.Input.Text label='비밀번호 변경:' name='' />
            <Components.Input.Text label='연결 IP:' name='' />
            <Form.Item valuePropName='checked' label='차단하다:' name=''>
                <Switch />
            </Form.Item>
        </Form>
    )
}

export default Create