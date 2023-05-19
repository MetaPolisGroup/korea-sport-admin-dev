import React from 'react'
import Components from '../../../../components'
import { TPointRules, TLevel } from '../../Basic/BettingCancel/data'
import { getColumns } from '../columns'

interface IBotProps {
    data: TPointRules

}

const Level: React.FC<IBotProps> = ({ data }) => {
    return (
        data && <div className='wraper-betting-level'>
            <Components.ListingTable<TLevel>
                datas={data.level}
                bordered={true}
                columns={getColumns()}
                render={(data, value, indexRow, indexColumn) => {
                    return <span>{value}</span>
                }}
            />
        </div>
    )
}

export default Level