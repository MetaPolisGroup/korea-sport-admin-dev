import React from 'react'
import Components from '../../../../components'
import { IBettingRules, IRuleByLevel } from '../../Basic/BettingCancel/data'
import { getColumns } from '../columns'

interface IBotProps {
    data: IBettingRules

}

const Rubylevel: React.FC<IBotProps> = ({ data }) => {
    return (
        data && <div className='wraper-betting-rubylevel' >
            <Components.ListingTable<IRuleByLevel>
                datas={data.rules_by_level}
                bordered
                columns={getColumns()}
                render={(data, value, indexRow, indexColumn) => {
                    return <span>{value}</span>
                }}
            />
        </div>
    )
}

export default Rubylevel