import React from 'react'
import { IPartnerManageMent } from '../../../../api/partnersApi'
import { Form, Space, Switch } from 'antd'
import { DomainFormRef, IResponseDomain } from '../../../../api/settingApi'
import Components from '../../../../components'
import './index.scss'
import { useAppSelector } from '../../../../app/hook'

interface IFormProps {
    partners: IPartnerManageMent[]
    domain?: IResponseDomain
}

interface FormData {
    situation: boolean,
    unauth_sub_code: boolean,
    domain: string,
    partner_with_domain: string
}

const FormContentSetting: React.ForwardRefRenderFunction<DomainFormRef, IFormProps> = (props, ref) => {
    const { partners, domain } = props
    const [form] = Form.useForm<FormData>();
    const { id } = useAppSelector(state => state.auth.auth)

    React.useImperativeHandle(ref, () => ({
        onSubmit: function handleSubmit<FormData>(
            onFinish: (value?: FormData) => void) {
            form.validateFields().then((value: any) => {
                onFinish(value)
            })
        }
    }))
    return (
        <div className="wrapper_domain">
            <Form form={form}>
                <Space direction='vertical'>
                    <Components.Input.Text name='domain' label='도메인' rules={[{ required: true, message: '이 학교는 비어 있지 않습니다' }]} initialValue={domain?.domain} />
                    <div>
                        <Form.Item valuePropName="checked" name='situation' label='차단' initialValue={domain?.situation ?? false}>
                            <Switch />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <Form.Item valuePropName="checked" name='unauth_sub_code' label='가입코드 인증 해제' initialValue={domain?.unauth_sub_code ?? false}>
                            <Switch />
                        </Form.Item>
                        <span style={{ fontSize: 10, marginTop: 9 }}>해제 활성화시 유저 가입시 자동으로 보유 파트너 소속으로 등록됩니다.</span>
                    </div>
                    <Components.Input.Select label='도메인 보유 파트너' name='partner_with_domain' data={partners.map(u => ({
                        key: u.id,
                        value: u.id,
                        text: u.name,
                    }))} initialValue={domain?.partner_with_domain ?? partners[0].id} />
                    <Components.Input.Text name='registrant' label='등록자' disabled />
                    <Components.Input.DatePicker name='date' label='작성시각' disabled />
                    <div style={{ display: 'none' }}>
                        <Components.Input.Text name='reg_admin_id' label='' disabled initialValue={id!} />
                    </div>
                </Space>
            </Form>
        </div>
    )
}
const FormContent = React.forwardRef<DomainFormRef, IFormProps>(FormContentSetting)
export default FormContent
