import { DatePicker, Space } from 'antd'
import Button from 'antd/es/button'
import Form from 'antd/es/form'
import React from 'react'
import { ESportStatus, ESportType, IMatchesResponse } from '../../../api/matchesApi'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { getColumns } from './columns'
import { handleExcel } from '..'
import { HeaderContent } from '../../../components/Layout'
import Components from '../../../components'

interface IMatchRealtimeProps {

}

const MatchPre: React.FC<IMatchRealtimeProps> = props => {
    const [data, setData] = React.useState<IMatchesResponse[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [old, setOld] = React.useState<IMatchesResponse[]>([])
    const [status, setStatus] = React.useState<ESportStatus>(ESportStatus.PROCESS)
    const [sportCategory, setSportCategory] = React.useState<ESportType>(ESportType.SOCCER)
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(30);

    const [form] = Form.useForm()

    const handleReset = () => {
        setSportCategory(ESportType.SOCCER)
        setStatus(ESportStatus.PROCESS)
        form.resetFields()
    }

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    };

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            await queryBuilderFunc("matches", [
                ["time_status", "==", status],
                ["sport_id", "==", sportCategory],
            ]).then(i => {
                setData(i as IMatchesResponse[])
                if (old.length === 0)
                    setOld(i as IMatchesResponse[])
                setLoading(false)
            })
        })()
    }, [status, sportCategory])

    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            <HeaderContent styleSearch={{ marginTop: 200 }}
                leftItem={<div>
                    <h1>
                        경기관리
                    </h1>
                    <div style={{ margin: "30px 0px", display: 'flex', gap: 10 }}>
                        <Button onClick={handleReset}>
                            초기화
                        </Button>
                    </div>
                    <div style={{ margin: "10px 0", display: 'flex', flexWrap: 'wrap', gap: 15 }}>
                        <ButtonAction title='뛰어나다' onHandle={() => handleExcel(data!, 'matchPre')} />
                        <ButtonAction title='과정에서 게임' onHandle={() => setStatus(ESportStatus.PROCESS)} isActive={ESportStatus.PROCESS === status} />
                        <ButtonAction title='경기가 끝났습니다' onHandle={() => setStatus(ESportStatus.END)} isActive={ESportStatus.END === status} />
                        <ButtonAction title='시작하지 마십시오' onHandle={() => setStatus(ESportStatus.NOT_STARTED)} isActive={ESportStatus.NOT_STARTED === status} />
                    </div>
                    <div style={{ margin: "20px 0", display: 'flex', flexWrap: 'wrap', gap: 15 }}>
                        <ButtonAction title='축구' onHandle={() => setSportCategory(ESportType.SOCCER)} isActive={ESportType.SOCCER === sportCategory} />
                        <ButtonAction title='농구' onHandle={() => setSportCategory(ESportType.BASKETBALL)} isActive={ESportType.BASKETBALL === sportCategory} />
                        <ButtonAction title='배구' onHandle={() => setSportCategory(ESportType.VOLLEYBALL)} isActive={ESportType.VOLLEYBALL === sportCategory} />
                        <ButtonAction title='야구' onHandle={() => setSportCategory(ESportType.BASEBALL)} isActive={ESportType.BASEBALL === sportCategory} />
                        <ButtonAction title='하키' onHandle={() => setSportCategory(ESportType.HOCKEY)} isActive={ESportType.HOCKEY === sportCategory} />
                        <ButtonAction title='축구' onHandle={() => setSportCategory(ESportType.FOOTBALL)} isActive={ESportType.FOOTBALL === sportCategory} />
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
                datas={getCurrentPageData()}
                pagination
                paginationOptions={{
                    page: { current: currentPage },
                    total: data.length
                }}
                paginationChange={change => {
                    setCurrentPage(change.page);
                    setPageSize(change.pageSize);
                }}
                columns={getColumns(status, sportCategory)}
                loading={loading}
                srollX={1200}
            />
        </Space>
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
export default MatchPre