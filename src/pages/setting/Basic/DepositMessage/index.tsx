import Button from 'antd/es/button'
import Form from 'antd/es/form/Form'
import React from 'react'
import setting from '../../../../api/settingApi'
import Components from '../../../../components'
import Utils from '../../../../utils'
import { TDepositMessage } from '../BettingCancel/data'
interface IDepositProps {
    data: TDepositMessage[]
}

const DepositMessage: React.FC<IDepositProps> = ({ data }) => {
    const handleSubmit = (value: TDepositMessage) => {
        const body = data.map((_, idx) => ({
            level: value[`level${idx}`],
            content: value[`content${idx}`]
        }))
        setting.message(body).then(i => {
            if (i)
                return Utils.notification.success('성공')

            Utils.notification.error('실패한')
        })
    }
    return (
        <React.Fragment>
            <Form onFinish={handleSubmit} className='wrapper-deposit-message' layout='vertical'>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'space-around' }}>
                    {data.map((item, idx) => <ItemCard key={idx} item={item} name={{ level: `level${idx}`, content: `content${idx}` }} />)}
                </div>
                <div style={{ marginTop: 50, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button htmlType='submit'>
                        Send
                    </Button>
                </div>
            </Form>
        </React.Fragment>
    )
}

export default DepositMessage

const ItemCard: React.FC<{
    item: TDepositMessage,
    name: { level: string; content: string; }
}> = ({ item, name }) => {
    return <div className='wrapper-deposit-message-item'>
        <h5 >레벨별 입금통장 설정</h5>
        <Components.Input.Select
            label=''
            name={name.level}
            initialValue={item.level}
            style={{ margin: '20px 0' }}
            data={Array(5).fill(0).map((item, index) => ({
                key: index + 1,
                value: index + 1,
                text: index + 1 + '레벨'
            }))}
        />
        <Components.Input.TextArea label='' name={name.content} initialValue={item.content as string} />
    </div>
}