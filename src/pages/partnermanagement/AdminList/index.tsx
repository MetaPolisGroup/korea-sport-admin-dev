import { Button, Space } from 'antd'
import React from 'react'
import { handleExcel } from '..'
import { IPartnerManageMent } from '../../../api/partnersApi'
import Components from '../../../components'
import Popup, { PopupRef } from '../../../components/Popup'
import { IUser } from '../../../features/auth'
import { queryBuilderFunc } from '../../../service/queryFunction'
import { getColumns } from './columns'
import Create from './create'

const AdminList = () => {
  const [data, setData] = React.useState<IPartnerManageMent[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const createRef = React.createRef<PopupRef>()

  React.useEffect(() => {
    (async () => {
      await queryBuilderFunc('administrators', [], undefined, undefined, doc => {
        setData(doc as IPartnerManageMent[])
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
      <h2>관리자 목록</h2>
      <Space style={{ margin: '10px 0' }} >
        <Button onClick={() => handleExcel(data, 'record')}>뛰어나다</Button>
        <Popup
          title='뛰어나다'
          ref={createRef}
          selector={<Button onClick={() => createRef.current?.open()}>만들다</Button>}
          content={<Create partners={data} />}
        />
      </Space>
      <Components.ListingTable<IPartnerManageMent>
        columns={getColumns(data)}
        datas={getCurrentPageData()}
        pagination
        bordered
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

export default AdminList