import { Form } from 'antd'
import React from 'react'
import { IResponseSportSetting } from '../../../../api/noticeApi'
import Components from '../../../../components'
import { HeaderContent } from '../../../../components/Layout'
import { queryBuilderFunc } from '../../../../service/queryFunction'
import { getColumns } from '../Leagues/comluns'

const Nation = () => {
    const [loading, setLoading] = React.useState<boolean>(true)
    const [form] = Form.useForm()
    const [datas, setDatas] = React.useState<IResponseSportSetting[]>([])
    const [old, setOld] = React.useState<IResponseSportSetting[]>([])

    React.useEffect(() => {
        (async () => queryBuilderFunc('countries', [], undefined, undefined, docs => {
            setDatas(docs as IResponseSportSetting[])
            if (old.length === 0)
                setOld(docs as IResponseSportSetting[])
            setLoading(false)
        }))()
    }, [])

    return (
        <React.Fragment>
            <HeaderContent leftItem={<h2>스포츠 국가명 설정</h2>} loading={setLoading} callback={search => {
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
                    columns={getColumns(form, 'country')}
                    loading={loading}
                    srollX={1200}
                />
            </Form>
        </React.Fragment>
    )
}

export default Nation