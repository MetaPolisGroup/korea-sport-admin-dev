import Button from 'antd/es/button'
import { Rule } from 'antd/es/form'
import Form, { useForm } from 'antd/es/form/Form'
import setting from '../../../../../api/settingApi'
import Components from '../../../../../components'
import Utils from '../../../../../utils'
import { TBigBetAlert } from '../../BettingCancel/data'

interface IBigBettingProps {
  data: TBigBetAlert
}

let rules: Rule[] = [
  {
    required: true,
    message: '이 장소를 입력하십시오',
  },
]

const BigBettingAlert: React.FC<IBigBettingProps> = ({ data }) => {
  const [form] = useForm<TBigBetAlert>()
  const handleSubmit = (value: TBigBetAlert) => {
    setting.bigbet(value as any).then(i => {
      if (i)
        return Utils.notification.success("성공")
      Utils.notification.error('실패한')
    })
  }
  return (
    <div style={{ padding: '0 50px' }}>
      <h1>고액 배팅 알람</h1>
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        style={{ display: 'flex', justifyContent: 'start', marginTop: 20, gap: 20, flexWrap: 'wrap' }} form={form}>
        <Components.Input.Text formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value!.replace(/(,*)/g, '')} type='number' label='스포츠 (Won)' name='sports' rules={rules} initialValue={data.sports} />
        <Components.Input.Text type='number' label='실시간 (Won)' name='real_time' rules={rules} initialValue={data.real_time} />
        <Components.Input.Text type='number' label='미니게임 (Won) ' name='mini_game' rules={rules} initialValue={data.mini_game} />
        <Components.Input.Text type='number' label='영상게임 (Won)' name='video_game' rules={rules} initialValue={data.video_game} />
        <Button htmlType='submit' style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 27 }}>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default BigBettingAlert