import { Form, Space } from 'antd'
import React from 'react'
import Components from '../../../../components'
import { HeaderContent } from '../../../../components/Layout'
import { queryBuilderFunc } from '../../../../service/queryFunction'
import { getColumns } from '../Leagues/comluns'

interface IResponse {
    korean_name: string,
    name: string,
    id: string
}

const Leagues = () => {
    const [sport, setSport] = React.useState<IResponse[]>()
    const [countries, setCountries] = React.useState<IResponse[]>()
    const [datas, setDatas] = React.useState<IResponse[]>([]);
    const [loading, setLoading] = React.useState(true)
    const [old, setOld] = React.useState<IResponse[]>([])
    const [filter, setFilter] = React.useState({
        sport_id: '1',
        countries: 'ad',
    })
    const [formA] = Form.useForm()
    const [formB] = Form.useForm()

    const handleCall = async () => {
        await queryBuilderFunc('sports', [], undefined, undefined, data => {
            setSport(data as IResponse[])
        })
        await queryBuilderFunc('countries', [], undefined, undefined, data => {
            setCountries(data as IResponse[])
        })
    }

    React.useEffect(() => {
        handleCall()
    }, [])

    React.useEffect(() => {
        (async () => await queryBuilderFunc('leagues', [['sport_id', '==', filter.sport_id ?? '1'], ['cc', '==', filter.countries ?? 'ad']], undefined, undefined, data => {
            setDatas(data as IResponse[])
            if (old.length === 0)
                setOld(data as IResponse[])
            setLoading(false)
        }))()

    }, [filter])

    React.useEffect(() => {
        formA.setFieldsValue({
            sport: sport?.[0].korean_name,
            countries: countries?.[0].id
        })
    }, [formA, sport, countries])

    return (
        <div>
            <HeaderContent styleSearch={{ marginTop: 70 }} leftItem={<Form form={formA} layout='vertical'>
                <h2>스포츠 팀명 설정</h2>
                <Space size={20}>
                    <Components.Input.Select
                        style={{ width: 150 }}
                        data={sport?.map(i => ({
                            key: i.id,
                            value: i.id,
                            text: i.name
                        }))}
                        label='스포츠'
                        name='sport'
                        onChange={e => setFilter({ ...filter, sport_id: e })}
                    />
                    <Components.Input.Select
                        style={{ width: 150 }}
                        data={countries?.map(i => ({
                            key: i.id,
                            value: i.id,
                            text: i.korean_name
                        }))}
                        initialValue={countries?.[0].id}
                        label='국가'
                        name='countries'
                        onChange={e => setFilter({ ...filter, countries: e })}
                    />
                </Space>
            </Form>}
                loading={setLoading} callback={search => {
                    if (!search.trim() || !datas) {
                        return setDatas(old)
                    }
                    const filter = datas.filter((i) =>
                        i.id?.toLowerCase().includes(search.toLowerCase()) ||
                        i.korean_name?.toString().toLowerCase().includes(search.toLowerCase()) ||
                        i.name?.toString().toLowerCase().includes(search.toLowerCase())
                    );
                    setDatas(filter)
                }} />
            <Form form={formB}>
                <Components.ListingTable<IResponse>
                    columns={getColumns(formB, 'team')}
                    loading={loading}
                    bordered
                    datas={datas}
                    render={(data, value, indexRow, indexColumn) => {
                        return <span>{value}</span>;
                    }}
                />
            </Form>
        </div>
    )
}

export default Leagues