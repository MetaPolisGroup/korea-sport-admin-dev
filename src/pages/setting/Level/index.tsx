import React from 'react'
import Form from 'antd/es/form'
import setting from '../../../api/settingApi'
import Button from 'antd/es/button'
import Utils from '../../../utils'
import Level from './Level'
import { IDataResponsSetting, TLevel, TPointRules } from '../Basic/BettingCancel/data'
import { getAllDocuments } from '../../../service/queryFunction'
import { useAppSelector } from '../../../app/hook'
import './index.scss'
import Components from '../../../components'
const SettingLevel = () => {
    const [data, setData] = React.useState<IDataResponsSetting>()
    const [form] = Form.useForm<TLevel>()
    const { id } = useAppSelector(state => state.auth.auth)
    React.useEffect(() => {
        (async () => await getAllDocuments('preferences', value => setData(value[0] as IDataResponsSetting)))()
    }, [])

    return (
        <React.Fragment>
            {data && <Form form={form} onFinish={(e: any) => (handleSubmit(e, data, id!))} layout='vertical'>
                <Components.Input.Text
                    initialValue={data.point_rules.withdraw_with_condition}
                    label='출첵 조건금액'
                    name='withdraw_with_condition'
                    type='number' style={{ width: '10%', margin: '0 0 20px 0' }}
                    rules={[{ required: true, message: '제목은 비워둘 수 없습니다.', }]} />
                <Level data={data.point_rules} />
                <Button htmlType='submit'>로그인</Button>
            </Form>}
        </React.Fragment>
    )
}

export default SettingLevel

const handleSubmit = (value: TLevel, data: IDataResponsSetting, id: string) => {
    const RuleByLevel = data?.point_rules.level?.map(((_, idx) => ({
        level: value[`level${idx}`],
        join_points: value[`join_points${idx}`],
        upd_admin_id: id,
        daily_max_depo_points: value[`daily_max_depo_points${idx}`],
        daily_max_losing_points: value[`daily_max_losing_points${idx}`],
        daily_max_recommend_points: value[`daily_max_recommend_points${idx}`],
        first_depo_points: value[`first_depo_points${idx}`],
        every_depo_points: value[`every_depo_points${idx}`],
        recom_first_depo_point: value[`recom_first_depo_point${idx}`],
        recom_every_depo_point: value[`recom_every_depo_point${idx}`],
        attendance_check: value[`attendance_check${idx}`],
        reg_admin_id: value[`reg_admin_id${idx}`]
    })))
    const body = {
        level: RuleByLevel,
        withdraw_with_condition: value.withdraw_with_condition,
    }
    setting.pointlevel(body as unknown as TPointRules).then(i => {
        if (i)
            Utils.notification.success('성공')
    })
}