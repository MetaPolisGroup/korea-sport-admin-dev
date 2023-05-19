import React from 'react'

const Sport = React.lazy(() => import('./Sport'))
const Nation = React.lazy(() => import('./Nation'))
const Leagues = React.lazy(() => import('./Leagues'))
const Team = React.lazy(() => import('./Team'))

interface ISettingComponent extends React.FC {
    Sport: typeof Sport
    Nation: typeof Nation
    Leagues: typeof Leagues
    Team: typeof Team
}

const Setting: ISettingComponent = () => null

Setting.Sport = Sport
Setting.Nation = Nation
Setting.Leagues = Leagues
Setting.Team = Team
export default Setting