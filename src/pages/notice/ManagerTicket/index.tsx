import { Button, Form, Space, } from 'antd'
import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { useAppSelector } from '../../../app/hook'
import Components from '../../../components'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { HeaderContent } from '../../../components/Layout';

import { getColumns } from './columns'
import './index.scss'
import { handleExcel } from '..'

interface IManagerTicketProps {
    user_id?: string
}

export interface IGetColumnsTicket extends DocumentData {
    created_at: string
    id: string
    key: string
    status: "Closed" | "Waiting for process"
    type: "Deposit" | "Withdraw" | "Support"
    collectionBData: ICollectionB[]
    user_id: string
    amount?: number
    title?: string
}

export interface ICollectionB {
    content: string,
    created_at: string,
    id: string,
    name: string,
    sender_id: string,
    status: boolean,
}

const ManagerTicket: React.FC<IManagerTicketProps> = ({ user_id }) => {

    const [datas, setDatas] = React.useState<IGetColumnsTicket[]>([])
    const [old, setOld] = React.useState<IGetColumnsTicket[]>([])
    const [loading, setLoading] = React.useState(true)
    const [form] = Form.useForm();
    const { id } = useAppSelector(state => state.auth.auth)
    const [message, setMessage] = React.useState<IGetColumnsTicket[]>([]);

    React.useEffect(() => {
        (async () => {
            if (!user_id)
                await queryBuilderFunc('tickets', [["type", "==", "Support"], ["delete", "==", false]], [{ field: 'created_at', direction: 'desc' }], undefined, docs => {
                    setDatas(docs as IGetColumnsTicket[])
                    if (old.length === 0) {
                        setOld(docs as IGetColumnsTicket[])
                    }
                    setLoading(false)
                })
            else
                await queryBuilderFunc('tickets', [["type", "==", "Support"], ["delete", "==", false], ["user_id", '==', user_id]], [{ field: 'created_at', direction: 'desc' }], undefined, docs => {
                    setDatas(docs as IGetColumnsTicket[])
                    if (old.length === 0) {
                        setOld(docs as IGetColumnsTicket[])
                    }
                    setLoading(false)
                })
        })()
    }, [])

    return <div className='wrapper-managerticket' >
        <HeaderContent leftItem={<Space>
            <h2>질문 및 답변 목록</h2>
            <Button onClick={() => handleExcel(datas, 'ticket')}> 뛰어나다</Button>
        </Space>} loading={setLoading} callback={search => {
            if (!search.trim() || !datas) {
                return setDatas(old)
            }
            const filter = datas.filter((i) =>
                i.title?.toLowerCase().includes(search.toLowerCase()) ||
                i.user_id?.toString().toLowerCase().includes(search.toLowerCase())
            );
            setDatas(filter)
        }} />
        {datas && <Components.ListingTable<IGetColumnsTicket>
            columns={getColumns(
                form, id!, message, setMessage
            )}
            datas={datas}
            loading={loading}
            render={(data, value, indexRow, indexColumn) => {
                return <span>{value}</span>
            }} />}
    </div>
}
export default ManagerTicket