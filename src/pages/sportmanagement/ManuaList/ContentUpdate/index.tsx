import Button from 'antd/es/button'
import Form from 'antd/es/form'
import React from 'react'
import matchesAPI, { ESportStatus, ESportType, IMatchesResponse } from '../../../../api/matchesApi'
import Input from '../../../../components/Input'
import Utils from '../../../../utils'

interface IFormData {
    home: string,
    away: string,
    timeStatus: ESportStatus
    [key: string]: string | ESportStatus,
}
const ContentUpdate: React.FC<{
    status: ESportStatus,
    type: ESportType,
    data: IMatchesResponse
    onCancel: () => void
}> = ({ status, type, data, onCancel }) => {
    const [form] = Form.useForm<IFormData>()
    let ssResult = data.ss?.split("-")

    const handleSubmit = (value: IFormData) => {
        const scores = Array(Number(handleConvert(type)) + 1).fill(0).map((_, idx) => ({
            home: value[`home${idx}`],
            away: value[`away${idx}`]
        }))
        matchesAPI.updateBetResult({
            scores,
            ss: data.ss!,
            timeStatus: status,
            id: data.id!
        }).then(i => {
            if (i) {
                onCancel()
                return Utils.notification.success('성공')
            }
            Utils.notification.error('실패한')
        })
    }

    let divisionArray = Array(handleConvert(type)).fill(0)
    let scoreArray = Array(Number(handleConvert(type)) + 1).fill(0)
    return (
        <Form form={form} onFinish={handleSubmit} style={{ marginTop: 50 }}>
            <Input.Select
                label='Match/Progress Status'
                name='match-progress'
                initialValue={Utils.renderStatus(data.time_status as ESportStatus)}
                data={options}
                searchDebounce

            />
            <div style={{ display: 'flex', gap: 50 }}>
                <p>score</p>
                <div>
                    <div style={{ display: 'flex', }}>
                        <p style={{ border: '0.1px solid', padding: '5px 10px' }}>Division</p>
                        {divisionArray.map((_, idx) => {
                            let text = idx === 0
                                ? '1st'
                                : idx < 3
                                    ? `${idx + 1}ND` : idx + 1 + 'TH'
                            return <p style={{ border: '0.1px solid', padding: '5px 12px' }} key={idx}>{text}</p>
                        })}
                        <p style={{ border: '0.1px solid', padding: '5px 15px' }}>FT</p>
                    </div>
                    <div style={{ display: 'flex', }}>
                        <div style={{ margin: '15px 0' }}>
                            Home
                        </div>
                        <div style={{ margin: '10px 33px', display: 'flex', gap: 3 }}>
                            {scoreArray.map((_, idx) =>
                                <Input.Text
                                    style={{ padding: '5px', width: 45 }}
                                    key={idx}
                                    name={`home${idx}`}
                                    initialValue={idx === scoreArray.length - 1 ? ssResult?.[0] : data.scores?.[idx + 1]?.home}
                                />)}
                        </div>
                    </div>
                    <div style={{ display: 'flex', }}>
                        Away
                        <div style={{ margin: '-4px 40px 0px 39px', display: 'flex', gap: 3 }}>
                            {scoreArray.map((_, idx) =>
                                <Input.Text
                                    style={{ padding: '5px', width: 45 }}
                                    key={idx} name={`away${idx}`}
                                    initialValue={idx === scoreArray.length - 1 ? ssResult?.[1] : data.scores?.[idx + 1]?.away}
                                />)}
                        </div>
                    </div>
                </div>
            </div>
            <Form.Item style={{ display: 'flex', justifyContent: "flex-end" }}>
                <Button onClick={() => onCancel()} style={{ marginRight: 5, backgroundColor: 'red', color: 'white' }}>
                취소
                </Button>
                <Button htmlType='submit'>
                제출하다
                </Button>
            </Form.Item>
        </Form>
    )
}

const handleConvert = (type: ESportType) => {
    switch (type) {
        case ESportType.SOCCER:
            return 2
        case ESportType.BASKETBALL:
            return 4
        case ESportType.BASEBALL:
            return 9
        case ESportType.FOOTBALL:
            return 7
        case ESportType.HOCKEY:
            return 5
        case ESportType.VOLLEYBALL:
            return 3
        default:
            break;
    }
}

const options = [
    {
        key: ESportStatus.PROCESS,
        value: ESportStatus.PROCESS,
        text: 'PROCESS'
    },
    {
        key: ESportStatus.NOT_STARTED,
        value: ESportStatus.NOT_STARTED,
        text: 'NOT_STARTED'
    },
    {
        key: ESportStatus.END,
        value: ESportStatus.END,
        text: 'END'
    },
]
export default ContentUpdate