import React from 'react'
import { Form, Space } from 'antd'
import Components from '../../../../components'
import './index.scss'
const Recharge = () => {
    const [form] = Form.useForm()

    return (
        <Form form={form} className='form-wrapper'>
            <Space direction='vertical'>
                <Components.Input.Text label='현재 보유금액' name='' disabled />
                <Components.Input.Text label='추가/차감 금액' name='' />
                <Components.Input.TextArea label='메모' name='' />
            </Space>
        </Form>
    )
}

export default Recharge