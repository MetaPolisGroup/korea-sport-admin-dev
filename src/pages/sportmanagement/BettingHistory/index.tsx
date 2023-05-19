import React from 'react';
import { BettingStatus, IResponseBet } from '../../../api/bettingApi';
import Components from '../../../components';
import { IUser } from '../../../features/auth';
import { queryBuilderFunc } from '../../../service/queryFunction';
import ItemHistory from './ItemHistory';

interface IHistoryComponent {
    id?: string
}

const BettingHistory: React.FC<IHistoryComponent> = ({ id }) => {
    const [data, setData] = React.useState<IResponseBet[]>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const [status, setStatus] = React.useState<BettingStatus>('Waiting for settlement')

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            if (!id)
                await queryBuilderFunc("bets", [
                    ["status", "==", status],
                ]).then(i => {
                    setData(i as IResponseBet[])
                    setLoading(false)
                })
            else
                await queryBuilderFunc("bets", [
                    ["delete", "==", false],
                    ["user_id", "==", id]
                ]).then(i => {
                    setData(i as IResponseBet[])
                    setLoading(false)
                })
        })()
    }, [status])
    return (
        <div>
            {loading ? <Components.Loading /> : data ? data?.map((item) => {
                return <Components.Box<IUser>
                    id={item.user_id}
                    key={item.id}
                    collectionName='users'
                    filters={[["id", "==", item.user_id]]}
                    render={user => {
                        return user ? <ItemHistory item={item} data={data} user={user} /> : <Components.Loading />
                    }}
                />
            }) : <p>Emty</p>}
        </div>
    )
}

export default BettingHistory
