import React from 'react'
import Button from 'antd/es/button'
import Form from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import dayjs from 'dayjs'
import { DatePicker } from 'antd'
import { handleExcel } from '..'
import { ESportStatus, ESportType, IMatchesResponse } from '../../../api/matchesApi'
import { formatDate } from '../../../components/Input/DatePicker'
import { HeaderContent } from '../../../components/Layout'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { getColumns } from './columns'
import Components from '../../../components'

interface IMatchRealtimeProps {

}

const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

const MatchRealtime: React.FC<IMatchRealtimeProps> = props => {
    const [data, setData] = React.useState<IMatchesResponse[]>()
    const [old, setOld] = React.useState<IMatchesResponse[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [startDay, setStartDay] = React.useState<dayjs.Dayjs | number>(start)
    const [endDay, setEndDay] = React.useState<dayjs.Dayjs | number>(end)
    const [status, setStatus] = React.useState<ESportStatus>(ESportStatus.PROCESS)
    const [sportCategory, setSportCategory] = React.useState<ESportType>(ESportType.SOCCER)
    const [form] = Form.useForm()

    const handleReset = () => {
        setStartDay(start)
        setEndDay(end)
        setSportCategory(ESportType.SOCCER)
        setStatus(ESportStatus.PROCESS)
        form.resetFields()
    }

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await queryBuilderFunc("matches", [
                ["time_status", "==", status],
                ["sport_id", "==", sportCategory],
                ["time", ">=", startDay.toString()],
                ["time", "<=", endDay.toString()]

            ]).then(i => {
                setData(i as IMatchesResponse[])
                if (old.length === 0)
                    setOld(i as IMatchesResponse[])
                setLoading(false)
            })
        })()
    }, [status, startDay, endDay, sportCategory])

    return (
        <div>
            <HeaderContent styleSearch={{ marginTop: 200 }}
                leftItem={<div>
                    <h1>
                        경기관리 - 실시간
                    </h1>
                    <div style={{ margin: "30px 10px", display: 'flex', gap: 10 }}>
                        <Form form={form}>
                            <FormItem name='date'>
                                <DatePicker.RangePicker
                                    onChange={e => {
                                        setStartDay(dayjs(e?.[0]!).valueOf())
                                        setEndDay(dayjs(e?.[1]!).valueOf())
                                        setStatus(ESportStatus.NOT_STARTED)
                                    }}
                                    format={formatDate}
                                    clearIcon={false}
                                />
                            </FormItem>
                        </Form>
                        <Button onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                    <div style={{ margin: "10px 0", display: 'flex', flexWrap: 'wrap', gap: 15 }}>
                        <ButtonAction title='Excel' onHandle={() => handleExcel(data!, 'matchPre')} />
                        <ButtonAction title='Game in process' onHandle={() => setStatus(ESportStatus.PROCESS)} isActive={ESportStatus.PROCESS === status} />
                        <ButtonAction title='Match ended' onHandle={() => setStatus(ESportStatus.END)} isActive={ESportStatus.END === status} />
                        <ButtonAction title='Not Start' onHandle={() => setStatus(ESportStatus.NOT_STARTED)} isActive={ESportStatus.NOT_STARTED === status} />
                        <ButtonAction title='abnormal occurrence' />
                    </div>
                    <div style={{ margin: "20px 0", display: 'flex', flexWrap: 'wrap', gap: 15 }}>
                        <ButtonAction title='Soccer' onHandle={() => setSportCategory(ESportType.SOCCER)} isActive={ESportType.SOCCER === sportCategory} />
                        <ButtonAction title='Basketball' onHandle={() => setSportCategory(ESportType.BASKETBALL)} isActive={ESportType.BASKETBALL === sportCategory} />
                        <ButtonAction title='Volleyball' onHandle={() => setSportCategory(ESportType.VOLLEYBALL)} isActive={ESportType.VOLLEYBALL === sportCategory} />
                        <ButtonAction title='Baseball' onHandle={() => setSportCategory(ESportType.BASEBALL)} isActive={ESportType.BASEBALL === sportCategory} />
                        <ButtonAction title='Hockey' onHandle={() => setSportCategory(ESportType.HOCKEY)} isActive={ESportType.HOCKEY === sportCategory} />
                        <ButtonAction title='Football' onHandle={() => setSportCategory(ESportType.FOOTBALL)} isActive={ESportType.FOOTBALL === sportCategory} />
                    </div>
                </div>}
                loading={setLoading} callback={search => {
                    if (!search.trim() || !data) {
                        return setData(old)
                    }
                    const filter = data.filter((i) =>
                        i.nation?.toLowerCase().includes(search.toLowerCase()) ||
                        i.home?.name?.toLowerCase().includes(search.toLowerCase()) ||
                        i.away?.name?.toLowerCase().includes(search.toLowerCase())
                    );
                    setData(filter)
                }} />
            <Components.ListingTable<IMatchesResponse>
                datas={data as any}
                columns={getColumns(status, sportCategory)}
                loading={loading}
            />
        </div>
    )
}

const ButtonAction: React.FC<{
    title: string,
    isActive?: boolean,
    onHandle?: () => void,
    isDisnable?: boolean
}> = ({ title, onHandle, isDisnable, isActive }) => {
    return <Button onClick={() => {
        onHandle?.();
    }} style={{ width: 200, }} className={isActive ? 'active' : ''} disabled={isDisnable}>
        {title}
    </Button>
}
export default MatchRealtime