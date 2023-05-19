import Button from 'antd/es/button'
import Col from 'antd/es/col'
import Form, { Rule } from 'antd/es/form'
import React from 'react'
import setting, { TFormDataDepositWithdraw } from '../../../../../api/settingApi'
import Components from '../../../../../components'
import Utils from '../../../../../utils'
import { IDataResponsSetting } from '../../BettingCancel/data'

interface IDepositWithdrawProps {
    data: IDataResponsSetting,
}

interface ComponentDSW extends React.FC<IDepositWithdrawProps> { }

const DepositWithdraw: ComponentDSW = ({ data }) => {
    const [form] = Form.useForm<TFormDataDepositWithdraw>()
    const handleSubmit = (value: TFormDataDepositWithdraw) => {
        value.bank_check_hours_end = JSON.stringify(new Date(value.bank_check_hours_end).getTime())
        value.bank_check_hours_start = JSON.stringify(new Date(value.bank_check_hours_start).getTime())
        value.confirm_password_when_edit_bet = false
        value.per_acc_no1 = false
        value.per_acc_no2 = false
        setting.depositWithdraw(value).then(i => {
            if (i)
                return Utils.notification.success('성공')

            return Utils.notification.error('실패한')
        })
    }

    return <Form
        form={form}
        onFinish={handleSubmit}
        style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }} layout='vertical'>
        <Col span={10}>
            <SelectionPosible label='가입 가능여부' name='available' initialValue={data.general.available} />
        </Col>
        <Col span={10}>
            <SelectionUses label='가입시 SMS 인증 사용여부' name='sms_verify_signup' isDefault={true} initialValue={data.general.sms_verify_signup} />
        </Col>

        <ColFormItem
            labelSelect='입금 가능여부' nameSelect='deposit_available'
            labelInput='재입금 가능 간격(분)' nameInput='re_deposit_interval' initialValue={data.deposit.re_deposit_interval} />
        <ColFormItem
            labelSelect='철수' nameSelect='withdraw_available'
            labelInput='1일 최대 출금회수' nameInput='max_number_withdraw_day' initialValue={data.withdraw.max_number_withdraw_day} />
        <Col span={10} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Components.Input.Text type='number' style={{ width: '100%' }} label='1일 최대 출금금액 (Won)' name='max_withdraw_amount_day' initialValue={data.withdraw.max_withdraw_amount_day} />
            <Components.Input.Text type='number' style={{ width: '100%' }} label='1회 최대 출금가능금액 (Won)' name='max_withdraw_amount_onetime' initialValue={data.withdraw.max_withdraw_amount_onetime} />
        </Col>

        <Col span={10} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Components.Input.Text type='number' style={{ width: '100%' }} label='재출금 가능 간격(분)' name='re_withdraw_interval' initialValue={data.withdraw.re_withdraw_interval} />
            <Col style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <Components.Input.TimePicker label='은행 수표 시간 시작' name='bank_check_hours_start' style={{ width: '100%' }} initialValue={data.general.bank_check_hours_start} />
                <Components.Input.TimePicker label='은행 수표 시간 종료' name='bank_check_hours_end' style={{ width: '100%' }} initialValue={data.general.bank_check_hours_end} />
            </Col>
        </Col>
        {/* <Col span={10} style={{ margin: '20px 0' }}>
            <SelectionUses label='베팅을 편집 할 때 비밀번호를 확인하십시오' name='confirm_password_when_edit_bet' initialValue={data.general.confirm_password_when_edit_bet} />
        </Col>
        <Col span={10} style={{ margin: '20px 0' }}>
            <Col style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <Col span={12}>
                    <SelectionUses label='개인계좌 1번 전체' name='per_acc_no1' initialValue={data.general.per_acc_no1} />
                </Col>
                <Col span={12}>
                    <SelectionUses label='개인계좌 2번 전체' name='per_acc_no2' initialValue={data.general.per_acc_no2} />
                </Col>
            </Col>
        </Col> */}
        <Col span={21} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
                <Button htmlType='submit'  >
                    제출하다
                </Button>
            </Form.Item>
        </Col>
    </Form >
}

export default DepositWithdraw

let data = [{
    text: '가능한',
    value: true,
    key: true,
},
{
    text: '불가능한',
    value: false,
    key: false,
}]

const SelectionPosible: React.FC<{
    label: string,
    name: string,
    initialValue?: any,
}> = ({ label, name, initialValue }) => {

    return <Components.Input.Select
        disabled
        label={label}
        placeholder='가능한'
        name={name}
        data={data}
        initialValue={initialValue}
        rules={rules}
    >
    </Components.Input.Select>
}

let dataUsed = [{
    text: '사용',
    value: true,
    key: true,
},
{
    text: '사용되지 않았습니다',
    value: false,
    key: false,
}]

const SelectionUses: React.FC<{
    label: string,
    name: string,
    initialValue: any,
    isDefault?: boolean
}> = ({ label, name, isDefault, initialValue }) => {

    return <Components.Input.Select
        disabled={isDefault}
        label={label}
        name={name}
        data={dataUsed}
        initialValue={isDefault ? false : initialValue}
        rules={rules}
    />
}

const ColFormItem: React.FC<{
    labelSelect: string,
    nameSelect: string,
    labelInput: string,
    nameInput: string,
    initialValue: any
}> = ({ labelSelect, nameSelect, labelInput, nameInput, initialValue }) => {

    return <Col span={10} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <SelectionPosible label={labelSelect} name={nameSelect} initialValue={true} />
        <Components.Input.Text style={{ width: '100%' }} type='number' label={labelInput} name={nameInput} initialValue={initialValue} rules={rules} />
    </Col>
}

let rules: Rule[] = [
    {
        required: true,
        message: '이 장소를 입력하십시오'
    }
]