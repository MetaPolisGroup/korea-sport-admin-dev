import { Button, Space } from 'antd'
import React from 'react'
import { handleExcel } from '..'
import partnerApi, { IPartnerManageMent, PartnerFormRef } from '../../../api/partnersApi'
import Components from '../../../components'
import Popup, { PopupRef } from '../../../components/Popup'
import { IUser } from '../../../features/auth'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { getColumns } from './columns'
import FormEdit from './SaveGame'

const BranchList = () => {
  const [data, setData] = React.useState<IPartnerManageMent[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [user, setUser] = React.useState<IUser[]>([])
  const valueFormRef = React.createRef<PartnerFormRef>()
  const formRef = React.createRef<PopupRef>()

  React.useEffect(() => {
    (async () => {
      await queryBuilderFunc('partners', [], undefined, undefined, doc => {
        setData(doc as IPartnerManageMent[])
        setLoading(false)
      })
      await queryBuilderFunc('users', [], undefined, undefined, doc => {
        setUser(doc as IUser[])
        setLoading(false)
      })
    })()
  }, [])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  return (
    <React.Fragment>
      <Space style={{ marginBottom: 10 }} direction='vertical'>
        <h2>파트너 목록</h2>
        <Space>
          <Button onClick={() => handleExcel(data, 'record')}>뛰어나다</Button>
          <Popup
            ref={formRef}
            title='신규 생성'
            width={700}
            footer
            selector={<Button onClick={() => formRef.current?.open()}>신규생성</Button>}
            content={<FormEdit popup={formRef} ref={valueFormRef} partners={data} />}
          />
        </Space>
      </Space>
      <Components.ListingTable<IPartnerManageMent>
        columns={getColumns(user, data)}
        datas={getCurrentPageData()}
        pagination
        paginationOptions={{
          page: { current: currentPage },
          total: data.length
        }}
        paginationChange={change => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
        loading={loading}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </React.Fragment>
  )
}

export default BranchList
let styleList: React.CSSProperties
export const ClassDivision = (division: string) => {
  switch (division) {
    case 'Headquarters':
      styleList = { marginLeft: 0 }
    case 'Sub-head':
      styleList = { marginLeft: 5 }
    case 'Distributor':
      styleList = { marginLeft: 10 }
    case 'Agency':
      styleList = { marginLeft: 15 }
    case 'Store':
      styleList = { marginLeft: 20 }

    default:
      break;
  }
  return <p style={styleList}>⌞ {division}</p>
}