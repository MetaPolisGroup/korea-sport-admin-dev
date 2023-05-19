import React from 'react'
import Utils from '../../utils'

const CompanyGame = React.lazy(() => import('./CompanyManagement'))
const GameManagement = React.lazy(() => import('./GameManagement'))
const Record = React.lazy(() => import('./Record'))
const TransMoney = React.lazy(() => import('./TransMoney'))

interface CasinoComponents extends React.FC {
    CompanyGame: typeof CompanyGame
    GameManagement: typeof GameManagement
    Record: typeof Record
    TransMoney: typeof TransMoney
}

const Casino: CasinoComponents = () => null
Casino.CompanyGame = CompanyGame
Casino.GameManagement = GameManagement
Casino.Record = Record
Casino.TransMoney = TransMoney

export default Casino
export const handleExcel = <T,>(datas: T[], name: string) =>
    Utils.excel({
        data: datas,
        name: name,
        fieldsOmit: ["key"],
        fieldsToFormat: {
            created_at: "created_at",
        },
    });
