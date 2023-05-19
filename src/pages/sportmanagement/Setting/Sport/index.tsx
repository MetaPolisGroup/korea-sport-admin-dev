import { Form } from 'antd'
import React from 'react'
import { IResponseSportSetting } from '../../../../api/noticeApi'
import Components from '../../../../components'
import { HeaderContent } from '../../../../components/Layout'
import { queryBuilderFunc } from '../../../../service/queryFunction'
import { getColumns } from './comluns'

const Sport = () => {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [form] = Form.useForm()
    const [datas, setDatas] = React.useState<IResponseSportSetting[]>([])
    const [old, setOld] = React.useState<IResponseSportSetting[]>([])

    React.useEffect(() => {
        (async () => queryBuilderFunc('sports', [], undefined, undefined, docs => {
            setDatas(docs as IResponseSportSetting[])
            if (old.length === 0)
                setOld(docs as IResponseSportSetting[])
            setLoading(false)
        }))()
    }, [])

    return (
        <React.Suspense>
            <HeaderContent styleSearch={{ marginTop: 20 }} leftItem={<h2>스포츠 종목 셋팅</h2>} loading={setLoading} callback={search => {
                if (!search.trim() || !datas) {
                    return setDatas(old)
                }
                const filter = datas.filter((i) =>
                    i.korean_name?.toLowerCase().includes(search.toLowerCase()) ||
                    i.name?.toString().toLowerCase().includes(search.toLowerCase())
                );
                setDatas(filter)
            }} />
            <Form form={form}>
                <Components.ListingTable<IResponseSportSetting>
                    datas={datas}
                    bordered
                    columns={getColumns(form)}
                    loading={loading}
                    srollX={1200}
                />
            </Form>
        </React.Suspense>
    )
}

export default Sport