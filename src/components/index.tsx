import React from 'react'
import ListingTable from './ListingTable'
import Loading from './Loading'
import Popup from './Popup'
import Input from './Input'
import Box from './Box'
import Layout from './Layout'
import Member from './Member'


interface IComponent extends React.FC {
    Layout: typeof Layout
    Loading: typeof Loading
    ListingTable: typeof ListingTable
    Box: typeof Box
    Popup: typeof Popup
    Input: typeof Input
    Member: typeof Member
}
const Components: IComponent = () => null
Components.Layout = Layout
Components.Loading = Loading
Components.ListingTable = ListingTable
Components.Box = Box
Components.Popup = Popup
Components.Input = Input
Components.Member = Member

export default Components