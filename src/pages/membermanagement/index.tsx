import React from "react";
import Utils from "../../utils";

const MemberList = React.lazy(() => import('./MemberList'))
const MemberRecord = React.lazy(() => import('./Record'))
const MemberStatus = React.lazy(() => import('./Status'))

interface IComponentMember extends React.FC {
    MemberList: typeof MemberList
    Record: typeof MemberRecord
    Status: typeof MemberStatus
}

const Member: IComponentMember = () => null

Member.MemberList = MemberList
Member.Record = MemberRecord
Member.Status = MemberStatus


export const handleExcel = <T,>(datas: T[], name: string) => Utils.excel({
    data: datas, name: name, fieldsOmit: ['key'], fieldsToFormat: {
        created_at: 'created_at',
    }
})

export default Member